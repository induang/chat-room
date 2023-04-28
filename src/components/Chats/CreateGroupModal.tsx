import React, { useEffect, useState } from "react";
import { getUserList } from "../../services/user";
import { IUser } from "../../services/user.type";
import UserItem from "../UserItem";
import closeIcon from "../../assets/close.png";
import { createGroupChat } from "../../services/chat";
import noti from "../../utils/noti";

export default function CreateGroupModal() {
  const [chatName, setChatName] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<Array<IUser>>([]);
  const [selectedUsers, setSelectedUsers] = useState<Array<IUser>>([]);

  const handleSelectUserClick = (user: IUser) => {
    if (!selectedUsers.includes(user))
      setSelectedUsers([...selectedUsers, user]);
  };

  const handleRemoveClick = (removeduser: IUser) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user._id !== removeduser._id)
    );
  };

  const handleCreateChatClick = () => {
    createGroupChat(
      chatName,
      selectedUsers.map((user) => user._id)
    ).then(() => {
      noti({ type: "success", message: `${chatName} create successful.` });
    });
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    getUserList(e.target.value).then((users) => {
      setSearchedUsers(
        users.filter(
          (user) =>
            selectedUsers
              .reduce((sumString, user) => (sumString += user._id), "")
              .indexOf(user._id) === -1
        )
      );
    });
  };

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
            <input
              type="text"
              placeholder="Type user name here..."
              className="input input-bordered w-full"
              value={keyword}
              onChange={handleKeywordChange}
            />
            <div className="selected-user-badge-list flex flex-wrap gap-1">
              {selectedUsers?.map((user) => (
                <span className="badge badge-primary badge-md" key={user._id}>
                  {user.name}
                  <span onClick={() => handleRemoveClick(user)}>
                    <img src={closeIcon} className="w-2 ml-1" />
                  </span>
                </span>
              ))}
            </div>
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
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleCreateChatClick}>
              Create
            </button>
            <label htmlFor="create-group-modal" className="btn">
              Cancel
            </label>
          </div>
        </label>
      </label>
    </>
  );
}
