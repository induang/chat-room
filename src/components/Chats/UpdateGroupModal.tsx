import { useEffect, useState } from "react";
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

export default function UpdateGroupModal() {
  const chat = useSelector((state: RootState) => state.chat.selectedChat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchedUsers, setSearchedUsers] = useState<Array<IUser>>();
  const [selectedUsers, setSelectedUsers] = useState<Array<IUser>>(chat.users);
  const [chatName, setChatName] = useState<string>(chat.chatName);
  const [keyword, setKeyword] = useState<string>("");

  const IDStringReducer = (users: Array<IUser>) => {
    return users.reduce((sumString, user) => (sumString += user._id), "");
  };

  const queryUsers = () => {
    getUserList(keyword).then((users) => {
      setSearchedUsers(
        users.filter(
          (user) => IDStringReducer(selectedUsers).indexOf(user._id) === -1
        )
      );
    });
  };

  const handleRemoveClick = (userId: string) => {
    removeMemberFromChat(chat._id, userId).then((res) => {
      setSelectedUsers(res.users);
    });
  };

  const handleSelectUserClick = (userId: string) => {
    addMemberToChat(chat._id, userId).then((res) => {
      setSelectedUsers(res.users);
    });
  };

  const handleUpdateChatNameClick = () => {
    renameChat(chat._id, chatName).then((res) => {
      dispatch(setSelectedChat(res));
    });
  };

  const handleLeaveChatClick = () => {
    const loggerId = window.localStorage.getItem("userId");
    loggerId &&
      removeMemberFromChat(chat._id, loggerId).then(() => {
        noti({ type: "success", message: "Leave successful." });
        navigate(0);
      });
  };

  useEffect(() => {
    queryUsers();
  }, [keyword, selectedUsers]);

  return (
    <>
      <input type="checkbox" id="update-group-modal" className="modal-toggle" />
      <label htmlFor="update-group-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="modal-box-content flex flex-col gap-y-2">
            <div className="selected-user-badge-list flex flex-wrap gap-1">
              {selectedUsers?.map((user) => (
                <span className="badge badge-primary badge-md">
                  {user.name}
                  <span onClick={() => handleRemoveClick(user._id)}>
                    <img src={closeIcon} className="w-2 ml-1" />
                  </span>
                </span>
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
                className="btn btn-primary"
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
                  <li onClick={() => handleSelectUserClick(user._id)}>
                    <a>
                      <UserItem user={user} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="leave-from-chat">
              <div
                className="btn btn-error float-right"
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
