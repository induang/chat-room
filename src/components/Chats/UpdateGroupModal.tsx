import { useEffect, useLayoutEffect, useState } from "react";
import { IUser } from "../../services/user.type";
import UserItem from "../UserItem";
import closeIcon from "../../assets/close.png";
import {
  addMemberToChat,
  removeMemberFromChat,
  renameChat,
} from "../../services/chat";
import { getUserList } from "../../services/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setSelectedChat } from "../../redux/slices/chatSlice";
import noti from "../../utils/noti";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { IDStringReducer } from "../../utils/tools";

export default function UpdateGroupModal() {
  const chat = useSelector((state: RootState) => state.chat.selectedChat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchedUsers, setSearchedUsers] = useState<Array<IUser>>();
  const [chatName, setChatName] = useState<string>(chat.chatName);
  const [keyword, setKeyword] = useState<string>("");
  const [updateNameDisabled, setUpdateNameDisabled] = useState(false);
  const [leaveDisabled, setLeaveDisabled] = useState(false);
  // TODO 实现 防抖

  const queryUsers = () => {
    getUserList(keyword).then((users) => {
      setSearchedUsers(
        users.filter(
          (user) => IDStringReducer(chat.users).indexOf(user._id) === -1
        )
      );
    });
  };

  const handleRemoveClick = (userId: string) => {
    removeMemberFromChat(chat._id, userId).then((chat) => {
      dispatch(setSelectedChat(chat));
    });
  };

  const handleSelectUserClick = (userId: string) => {
    addMemberToChat(chat._id, userId).then((chat) => {
      dispatch(setSelectedChat(chat));
    });
  };

  const handleUpdateChatNameClick = () => {
    setUpdateNameDisabled(true);
    renameChat(chat._id, chatName).then((res) => {
      dispatch(setSelectedChat(res));
      noti({ type: "success", message: "Update name successful." });
      navigate(0);
    });
  };

  const handleLeaveChatClick = () => {
    setLeaveDisabled(true);
    const loggerId = window.localStorage.getItem("userId");
    if (!loggerId) {
      noti({ type: "error", message: "User id missed." });
      navigate("/");
    }
    loggerId &&
      removeMemberFromChat(chat._id, loggerId).then(() => {
        // setLeaveDisabled(false);
        noti({ type: "success", message: "Leave successful." });
        navigate(0);
      });
  };
  // useEffect(() => {
  //   console.log("effect run.");
  //   queryUsers();
  // }, [keyword, chat.users]);

  useLayoutEffect(() => {
    queryUsers();
  }, [keyword, chat.users]);

  return (
    <>
      <input type="checkbox" id="update-group-modal" className="modal-toggle" />
      <label htmlFor="update-group-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="modal-box-content flex flex-col gap-y-2">
            <div className="selected-user-badge-list flex flex-wrap gap-1">
              {chat.users?.map((user) => (
                <label
                  key={user._id}
                  className="badge badge-primary badge-md"
                  onClick={() => handleRemoveClick(user._id)}
                >
                  {user.name}
                  <img src={closeIcon} className="w-2 ml-1" />
                </label>
              ))}
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Type chat name..."
                className="input input-bordered w-full"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
              <button
                className={clsx(
                  "btn btn-primary",
                  updateNameDisabled ? "btn-disabled" : ""
                )}
                onClick={handleUpdateChatNameClick}
              >
                Update
              </button>
            </div>
            <input
              type="text"
              placeholder="Type user name here..."
              className="input input-bordered w-full"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="searched-user-list">
              <ul className="menu w-full">
                {searchedUsers?.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => handleSelectUserClick(user._id)}
                  >
                    <a>
                      <UserItem user={user} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="leave-from-chat">
              <div
                className={clsx(
                  "btn btn-error float-right",
                  leaveDisabled ? "btn-disabled" : ""
                )}
                onClick={handleLeaveChatClick}
              >
                LEAVE
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  );
}
