// 感觉还是得更新整个chat对象啊，不然不同步
import { useState } from "react";
import { IUser } from "../../services/user.type";
import UserItem from "../UserItem";
import closeIcon from "../../assets/close.png";
import { IChat } from "../../services/chat.type";
import { addMemberToChat, removeMemberFromChat } from "../../services/chat";
import { getUserList } from "../../services/user";

const tmpUser = [
  { _id: "0x123", name: "Yingduan", pic: "", email: "" },
  { _id: "0x123", name: "Yingdn", pic: "", email: "" },
  { _id: "0x123", name: "duan", pic: "", email: "" },
  { _id: "0x123", name: "Yinguan", pic: "", email: "" },
  { _id: "0x123", name: "Yingduan", pic: "", email: "" },
  { _id: "0x123", name: "Yingdan", pic: "", email: "" },
  { _id: "0x123", name: "Yingduan", pic: "", email: "" },
  { _id: "0x123", name: "Yingduan", pic: "", email: "" },
  { _id: "0x123", name: "Yingdn", pic: "", email: "" },
  { _id: "0x123", name: "Yinduan", pic: "", email: "" },
  { _id: "0x123", name: "Yingduvvvvvan", pic: "", email: "" },
  { _id: "0x123", name: "Yingdduan", pic: "", email: "" },
];

export default function UpdateGroupModal({ chat }: { chat: IChat }) {
  const [searchedUsers, setSearchedUsers] = useState<Array<IUser>>();
  const [selectedUsers, setSelectedUsers] = useState<Array<IUser>>();
  const [chatName, setChatName] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const handleKeyWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "")
      getUserList("").then((res) => setSearchedUsers(res));
    setKeyword(e.target.value);
    console.log(keyword);
    getUserList(keyword).then((res) => {
      setSearchedUsers(res);
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

  return (
    <>
      <input type="checkbox" id="update-group-modal" className="modal-toggle" />
      <label htmlFor="update-group-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="modal-box-content flex flex-col gap-y-2">
            <div className="input-group">
              <input
                type="text"
                placeholder="Type chat name..."
                className="input input-bordered w-full"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
              <button className="btn btn-primary">Update</button>
            </div>
            <input
              type="text"
              placeholder="Type user name here..."
              className="input input-bordered w-full"
              value={keyword}
              onChange={handleKeyWordChange}
            />
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
              <div className="btn btn-error">LEAVE</div>
            </div>
          </div>
        </label>
      </label>
    </>
  );
}
