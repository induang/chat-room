import clsx from "clsx";
import { useState } from "react";
import { register } from "../../services/auth";
import PasswordToggle from "../PasswordToggle";
import VerifyCodeSendBTN from "../VerifyCodeSendBTN";

export default ({ show }: { show: boolean }) => {
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegisterClick = () => {
    register({ name, email, password, code: verifyCode }).then((res) => {
      // TODO noti
      // console.log("SUCCESS");
    });
  };

  return (
    <div className={clsx(show ? "" : "hidden")}>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl font-medium">Email:</span>
        </label>
        <div className="input-group flex">
          <input
            type="text"
            className="input input-bordered grow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <VerifyCodeSendBTN email={email} />
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl font-medium">Code:</span>
          <input
            type="text"
            className="input input-bordered"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl font-medium">User Name:</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <PasswordToggle labelText="Password" getPasswordChange={setPassword} />
      <PasswordToggle
        labelText="Confirm Password"
        getPasswordChange={setConfirmPassword}
      />

      <button
        className="btn btn-block btn-primary mt-10"
        onClick={handleRegisterClick}
      >
        Sign
      </button>
    </div>
  );
};
