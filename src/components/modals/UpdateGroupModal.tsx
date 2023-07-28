import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IUser } from "../../services/user.type";
import UserItem from "../common/UserItem";
import closeIcon from "@/assets/close.png";
import {
  addMemberToChat,
  removeMemberFromChat,
  renameChat,
} from "../../services/chat";
import { getUserList } from "../../services/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setSelectedChat, updateTheChat } from "../../redux/slices/chatSlice";
import noti from "../../utils/noti";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { IDStringReducer } from "../../utils/tools";

export default function UpdateGroupModal() {
  const chat = useSelector((state: RootState) => state.chat.selectedChat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchedUsers, setSearchedUsers] = useState<Array<IUser>>();
  const [chatName, setChatName] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [updateNameDisabled, setUpdateNameDisabled] = useState(false);
  const [leaveDisabled, setLeaveDisabled] = useState(false);
  const [menuDisabled, setMenuDisabled] = useState(false);
  const toggleLabelEle = useRef<HTMLLabelElement>(null);
  // TODO 实现 防抖

  const queryUsers = () => {
    getUserList(keyword).then((users) => {
      setSearchedUsers(
        users.filter(
          (user) => IDStringReducer(chat.users).indexOf(user._id) === -1,
        ),
      );
    });
  };

  const handleRemoveClick = (userId: string) => {
    removeMemberFromChat(chat._id, userId).then((chat) => {
      dispatch(setSelectedChat(chat));
    });
  };

  const handleSelectUserClick = (userId: string) => {
    setMenuDisabled(true);
    addMemberToChat(chat._id, userId)
      .then((chat) => {
        dispatch(setSelectedChat(chat));
      })
      .finally(() => {
        setMenuDisabled(false);
      });
  };

  const handleUpdateChatNameClick = () => {
    setUpdateNameDisabled(true);
    renameChat(chat._id, chatName).then((chat) => {
      console.log(chat);
      dispatch(setSelectedChat(chat));
      dispatch(updateTheChat(chat));
      noti({ type: "success", message: "Update name successful." });
    });
    toggleLabelEle.current?.click();
  };

  const handleLeaveChatClick = () => {
    setLeaveDisabled(true);
    const loggerId = window.localStorage.getItem("userId");
    if (!loggerId) {
      noti({ type: "error", message: "User id missed." });
      navigate("/");
    }
    loggerId &&
      removeMemberFromChat(chat._id, loggerId)
        .then(() => {
          noti({ type: "success", message: "Leave successful." });
          navigate(0);
        })
        .finally(() => setLeaveDisabled(false));
  };

  useLayoutEffect(() => {
    queryUsers();
  }, [keyword, chat.users]);

  useEffect(() => {
    // 初始化所有状态 模态框的逻辑一般是关闭就卸载的，这个样式库的modal不是
    setChatName(chat.chatName);
    setKeyword("");
    setSearchedUsers([]);
    setUpdateNameDisabled(false);
    setLeaveDisabled(false);
  }, [chat._id]);

  return (
    <>
      <input type="checkbox" id="update-group-modal" className="modal-toggle" />
      <label
        ref={toggleLabelEle}
        htmlFor="update-group-modal"
        className="modal cursor-pointer"
      >
        <label className="modal-box relative  rounded" htmlFor="">
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
                  updateNameDisabled ? "btn-disabled" : "",
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
                    className={clsx(!menuDisabled || "disabled")}
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
                  leaveDisabled ? "btn-disabled" : "",
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
