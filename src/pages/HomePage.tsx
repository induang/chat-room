import clsx from "clsx";
import { useState } from "react";
import Login from "../components/Authentications/Login";
import Registration from "../components/Authentications/Registration";

export default function HomePage() {
  const [loginShow, setLoginShow] = useState(true);
  const [registerShow, setRegisterShow] = useState(false);

  return (
    <div className="card w-96 bg-base-100 shadow-xl m-auto mt-20">
      <div className="card-body">
        <div className="tabs tabs-boxed">
          <a
            className={clsx(
              "tab w-1/2 text-xl font-medium",
              loginShow ? "tab-active" : ""
            )}
            onClick={() => {
              setRegisterShow(false);
              setLoginShow(true);
            }}
          >
            Login in
          </a>
          <a
            className={clsx(
              "tab w-1/2 text-xl font-medium",
              registerShow ? "tab-active" : ""
            )}
            onClick={() => {
              setLoginShow(false);
              setRegisterShow(true);
            }}
          >
            Sign up
          </a>
        </div>
        <div className="tabs-panel">
          <div>
            <Login show={loginShow} />
          </div>
          <div>
            <Registration show={registerShow} />
          </div>
        </div>
      </div>
    </div>
  );
}
