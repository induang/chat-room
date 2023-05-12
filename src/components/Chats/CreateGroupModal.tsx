import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../services/user.type";
import closeIcon from "../../assets/close.png";
import UserItem from "../UserItem";
import { getUserList } from "../../services/user";
import { IDStringReducer } from "../../utils/tools";
import { createGroupChat } from "../../services/chat";
import noti from "../../utils/noti";
import { RootState } from "../../redux";
import {
  addNewGroupChatUsers,
  removeNewGroupChatUsers,
} from "../../redux/slices/chatSlice";

export default function CreateGroupModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchedUsers, setSearchedUsers] = useState<Array<IUser>>([]);
  const newChat = useSelector((state: RootState) => state.chat.newGroupChat);
  // const [selectedUsers, setSelectedUsers] = useState<Array<IUser>>([]);
  const [chatName, setChatName] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const handleSelectUserClick = (user: IUser) => {
    // setSelectedUsers([...selectedUsers, user]);
    dispatch(addNewGroupChatUsers(user));
  };

  const handleRemoveClick = (user: IUser) => {
    // console.log("click + ", user.name);
    // const filteredUsers = selectedUsers.filter((item) => item._id !== user._id);
    // setSelectedUsers([...filteredUsers]);
    dispatch(removeNewGroupChatUsers(user));
  };

  const handleCreateChatClick = () => {
    createGroupChat(
      chatName,
      newChat.users.map((user) => user._id)
    ).then(() => {
      noti({
        type: "success",
        message: `${chatName} create successful.`,
      });
      navigate(0);
    });
  };

  const queryUsers = () => {
    getUserList(keyword).then((users) => {
      setSearchedUsers(
        users.filter(
          (user) => IDStringReducer(newChat.users).indexOf(user._id) === -1
        )
      );
    });
  };

  useLayoutEffect(() => {
    queryUsers();
  }, [keyword, newChat.users]);

  return (
    <>
      <input type="checkbox" id="create-group-modal" className="modal-toggle" />
      <label htmlFor="create-group-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="modal-box-content flex flex-col gap-y-2">
            <input
              type="text"
              placeholder="Type chat name..."
              className="input input-bordered w-full"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
            <div className="selected-user-badge-list flex flex-wrap gap-1">
              {newChat.users?.map((user) => (
                <div
                  key={user._id}
                  className="badge badge-primary badge-md"
                  onClick={() => handleRemoveClick(user)}
                >
                  {user.name}
                  <img src={closeIcon} className="w-2 ml-1" />
                </div>
              ))}
            </div>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleCreateChatClick}>
              Create
            </button>
            <label htmlFor="create-group-modal" className="btn">
              Cancel
            </label>
          </div>
          <div className="search-users-area mt-2 flex flex-col gap-y-2">
            <div className="text-slate-300 text-center">
              --------Search users and add to chat--------
            </div>
            <input
              type="text"
              placeholder="Search users here..."
              className="input input-bordered w-full"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="searched-user-list">
              <ul className="menu w-full">
                {searchedUsers?.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => handleSelectUserClick(user)}
                  >
                    <a>
                      <UserItem user={user} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </label>
      </label>
    </>
  );
}
