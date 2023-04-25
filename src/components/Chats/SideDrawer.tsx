import { useState } from "react";
import searchIcon from "../../assets/magnifier.png";
import { getUserList } from "../../services/user";
import { IUser } from "../../services/user.type";
import UserItem from "../UserItem";

export default function SideDrawer() {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<Array<IUser>>();
  const handleSearch = () => {
    setKeyword("");
    getUserList(keyword).then((res) => setSearchResults(res));
  };
  const handleEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="drawer absolute top-0 left-0">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Search User
          <img src={searchIcon} className="w-6 ml-2"></img>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <div className="input-group">
            <input
              type="text"
              value={keyword}
              placeholder="Type here to Search Users"
              className="input input-bordered input-primary w-full max-w-xs"
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleEnterDown}
            />
            <button
              className="btn btn-square btn-primary"
              onClick={handleSearch}
            >
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
              <li key={user._id}>
                <a>
                  <UserItem
                    userName={user.name}
                    pic={user.pic}
                    userEmail={user.email}
                    // handleFunction={() => console.log("Hello")}
                  />
                </a>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}
