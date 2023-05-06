import { useRef, useState } from "react";
import { getOrCreateChat } from "../../services/chat";
import { getUserList } from "../../services/user";
import { IUser } from "../../services/user.type";
import UserItem from "../UserItem";
import closeIcon from "../../assets/close-slender.png";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../redux/slices/chatSlice";

export default function Drawer() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<Array<IUser>>();
  const [userItemDisable, setUserItemDisabled] = useState(false);
  const toggleLabelEle = useRef<HTMLLabelElement>(null);

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
    if (userItemDisable) return;
    setUserItemDisabled(true);
    getOrCreateChat(userId).then((chat) => {
      dispatch(setSelectedChat(chat));
      setUserItemDisabled(false);
      toggleLabelEle.current?.click();
    });
  };
  return (
    <div className="drawer-side">
      <label
        ref={toggleLabelEle}
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
              className={clsx(userItemDisable ? "disabled" : "")}
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
