import { useNavigate } from "react-router-dom";
import noti from "../../utils/noti";

export default function ProfilerMenu() {
  const imgUrl = window.localStorage.getItem("pic") || "";
  const navigate = useNavigate();

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
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={imgUrl} />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between">Profile</a>
        </li>
        <li>
          <a onClick={handleLogoutClick}>Logout</a>
        </li>
      </ul>
    </div>
  );
}
