import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux";
import {
  removeReceivedNewMessagesChats,
  setSelectedChat,
} from "../../redux/slices/chatSlice";
import { IChat } from "../../services/chat.type";
import noti from "../../utils/noti";
import { exceptMeBetween2 } from "../../utils/tools";

export default function ProfileMenu() {
  const imgUrl = window.localStorage.getItem("pic") ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const unreadChats = useSelector(
    (state: RootState) => state.chat.receivedNewMessagesChats,
  );
  const userName = window.localStorage.getItem("name") ?? "";

  const handleUnReadClick = (chat: IChat) => {
    dispatch(removeReceivedNewMessagesChats(chat));
    dispatch(setSelectedChat(chat));
  };

  const handleLogoutClick = () => {
    // [TODO] fetch logout
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("pic");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("userId");
    noti({ type: "success", message: "Logout successful." });
    navigate("/");
  };

  return (
    <div className="profile-block border-2 border-gray-100 rounded px-2">
      <div className="dropdown dropdown-end  flex items-center gap-x-4 ">
        <div className="w-24 truncate">
          <div className="text-xl">{userName || "empty"}</div>
          <div className="text-slate-200">do not look there</div>
        </div>
        <label
          tabIndex={0}
          className={clsx(
            "btn btn-ghost btn-circle avatar",
            unreadChats.length ? "online" : "",
          )}
        >
          <div className="w-10 rounded-full">
            <img src={imgUrl} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a>Profile</a>
          </li>
          <li>
            <span>
              Notification
              {unreadChats.length ? (
                <span className="indicator-item badge badge-primary">
                  {unreadChats.length}
                </span>
              ) : (
                <></>
              )}
            </span>
            <ul className=" !right-full !left-auto bg-base-100">
              {unreadChats?.map((chat) => (
                <li key={chat._id} onClick={() => handleUnReadClick(chat)}>
                  <a>
                    {chat.isGroupChat
                      ? chat.chatName
                      : exceptMeBetween2(chat.users)[0].name}
                    <span className="indicator-item badge badge-primary">
                      new
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <a onClick={handleLogoutClick}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
