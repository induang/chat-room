import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../services/user.type";
import closeIcon from "../../assets/close.png";
import UserItem from "../common/UserItem";
import { getUserList } from "../../services/user";
import { IDStringReducer } from "../../utils/tools";
import { createGroupChat } from "../../services/chat";
import noti from "../../utils/noti";
import clsx from "clsx";

export default function CreateGroupModal({
  isShow,
  setIsShow,
}: {
  isShow: boolean;
  setIsShow: any;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchedUsers, setSearchedUsers] = useState<Array<IUser>>([]);
  const [selectedUsers, setSelectedUsers] = useState<Array<IUser>>([]);
  const [chatName, setChatName] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const handleSelectUserClick = (user: IUser) => {
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleRemoveClick = (user: IUser) => {
    const filteredUsers = selectedUsers.filter((item) => item._id !== user._id);
    setSelectedUsers([...filteredUsers]);
  };

  const handleCreateChatClick = () => {
    createGroupChat(
      chatName,
      selectedUsers.map((user) => user._id)
    ).then(() => {
      noti({
        type: "success",
        message: `${chatName} create successful.`,
      });
      navigate(0);
    });
  };

  const handleModalClose = () => {
    setIsShow(false);
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

  useLayoutEffect(() => {
    queryUsers();
  }, [keyword, selectedUsers]);

  return (
    <>
      <input type="checkbox" id="create-group-modal" className="modal-toggle" />
      <label
        htmlFor="create-group-modal"
        className={clsx("modal cursor-pointer", !isShow || "modal-open")}
      >
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
              {selectedUsers?.map((user) => (
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
            <label
              htmlFor="create-group-modal"
              className="btn"
              onClick={handleModalClose}
            >
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
