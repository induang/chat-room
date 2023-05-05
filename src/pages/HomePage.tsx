import clsx from "clsx";
import { useState } from "react";
import Login from "../components/Authentications/Login";
import Registration from "../components/Authentications/Registration";

export default function HomePage() {
  const [loginShow, setLoginShow] = useState(true);
  const [registerShow, setRegisterShow] = useState(false);

  return (
    <div className="home-page">
      <div className="app-name sm:w-96 w-full bg-base-100/90 m-auto mt-20 h-20 rounded text-3xl text-center py-5">
        {"😁 CHA! CHAT"}
      </div>
      <div className="auth-operation-card card sm:w-96 w-full bg-base-100 shadow-xl m-auto mt-2">
        <div className="card-body">
          <div className="tabs tabs-boxed">
            <a
              className={clsx(
                "login-tab-btn",
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
                "register-tab-btn",
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
            <Login show={loginShow} />
            <Registration show={registerShow} />
          </div>
        </div>
      </div>
    </div>
  );
}
