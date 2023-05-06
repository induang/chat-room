import { useState } from "react";
import { getOrCreateChat } from "../../services/chat";
import { getUserList } from "../../services/user";
import { IUser } from "../../services/user.type";
import UserItem from "../UserItem";
import closeIcon from "../../assets/close-slender.png";

export default function Drawer() {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<Array<IUser>>();

  const handleSearch = () => {
    setKeyword("");
    getUserList(keyword).then((res) => setSearchResults(res));
  };

  // 注册键盘enter键
  const handleEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFetchChatClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    userId: string
  ) => {
    // getOrCreateChat(userId).then((res) => console.log(res));
  };
  return (
    <div className="drawer-side">
      <label
        htmlFor="chat-search-users-drawer"
        className="drawer-overlay"
      ></label>

      <ul className="menu w-full sm:w-96 p-4 bg-base-100 text-base-content">
        <div className="search-input input-group">
          <input
            type="text"
            value={keyword}
            placeholder="Type here to Search Users"
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleEnterDown}
          />
          <button className="btn btn-square btn-primary" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <div className="users-list mt-2">
          {searchResults?.map((user) => (
            <li
              key={user._id}
              onClick={(event) => handleFetchChatClick(event, user._id)}
            >
              <a>
                <UserItem user={user} />
              </a>
            </li>
          ))}
        </div>
        <label
          htmlFor="chat-search-users-drawer"
          className="btn btn-primary btn-circle sm:hidden fixed bottom-3 left-1/2 -ml-6"
        >
          <img src={closeIcon} className="w-4" />
        </label>
      </ul>
    </div>
  );
}
