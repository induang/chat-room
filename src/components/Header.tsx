import { useState } from "react";

export default () => {
  const [roomName, setroomName] = useState("Default Room");
  return (
    <div className="navbar rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <a className="text-lg font-bold">{roomName}</a>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              Dropdown
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost rounded-btn">Button</a>
        </div>
      </div>
    </div>
  );
};
