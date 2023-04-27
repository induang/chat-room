import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import noti from "../../utils/noti";
import PasswordToggle from "./PasswordToggle";

export default function Login({ show }: { show: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    login({ email, password }).then((res) => {
      const { name, pic } = res;
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("pic", pic);
      noti({ type: "success", message: "Login successfully." });
      navigate("/chat");
    });
  };
  return (
    <div className={clsx(show ? "" : "hidden")}>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl font-medium">Email:</span>
        </label>
        <input
          tabIndex={0}
          type="text"
          className="input input-bordered"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <PasswordToggle labelText="Password" getPasswordChange={setPassword} />
      <button
        className="btn btn-block btn-primary mt-10"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
  );
}
