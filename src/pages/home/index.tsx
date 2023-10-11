import clsx from "clsx";
import { useState } from "react";
import LoginForm from "./components/Login";
import RegistrationForm from "./components/Registration";
import { APP_NAME } from "../../consts";
import GuestWelcomeModal from "@/components/modals/GuestWelcomeModal";
import { ILoginFormFields } from "./components/Login/LoginForm";

export default function HomePage() {
  const [loginShow, setLoginShow] = useState(true);
  const [loginValues, setLoginValues] = useState<ILoginFormFields>(
    {} as ILoginFormFields
  );

  const handleFillClick = () => {
    setLoginValues({
      email: "yingduan_ge@epam.com",
      password: "password",
    });
  };

  return (
    <div className="home-page">
      <div className="app-name sm:w-96 w-full bg-base-100/90 m-auto mt-20 h-20 rounded text-3xl text-center py-5">
        {APP_NAME}
      </div>
      <div className="auth-operation-card card sm:w-96 w-full bg-base-100 shadow-xl m-auto mt-2">
        <div className="card-body">
          <div className="tabs tabs-boxed">
            <a
              className={clsx(
                "login-tab-btn",
                "tab w-1/2 text-xl",
                loginShow ? "tab-active" : ""
              )}
              onClick={() => {
                setLoginShow(true);
              }}
            >
              Login in
            </a>
            <a
              className={clsx(
                "register-tab-btn",
                "tab w-1/2 text-xl",
                loginShow ? "" : "tab-active"
              )}
              onClick={() => {
                setLoginShow(false);
              }}
            >
              Sign up
            </a>
          </div>
          <div className="tabs-panel">
            <LoginForm show={loginShow} values={loginValues} />
            <RegistrationForm show={!loginShow} />
          </div>
        </div>
      </div>
      <GuestWelcomeModal handleFillClick={handleFillClick} />
    </div>
  );
}
