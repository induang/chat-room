import clsx from "clsx";
import searchIcon from "../../assets/loupe.png";
export default function DrawerBTN() {
  return (
    <>
      <label
        htmlFor="chat-search-users-drawer"
        className="btn btn-primary drawer-button hidden sm:inline-flex"
      >
        Search User
        <img src={searchIcon} className="w-5 ml-2"></img>
      </label>
      <label
        htmlFor="chat-search-users-drawer"
        className="btn btn-primary btn-square sm:hidden"
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
      </label>
    </>
  );
}
