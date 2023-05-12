import clsx from "clsx";
import { FormikFormProps, FormikValues } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services/auth";
import noti from "../../../utils/noti";
import CodeField from "../../common/CodeField";
import InputField from "../../common/InputField";
import InputFieldWithBTN from "../../common/InputFieldWithBTN";
import PasswordField from "../../common/PasswordField";

export interface IRegistrationFormProps {
  show: boolean;
}

export default function RegistrationForm(
  props: FormikFormProps & FormikValues & IRegistrationFormProps
) {
  const { show, values } = props;
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const handleRegisterClick = () => {
    setDisabled(true);
    const { name, email, password, code } = values;
    register({ name, email, password, code })
      .then(() => {
        noti({ type: "success", message: "Register successful" });
      })
      .finally(() => {
        navigate("/");
      });
  };

  return (
    <div className={clsx("register-tab-page", show || "hidden")}>
      <div className="form-control">
        <InputFieldWithBTN name="email" label="Email" />
      </div>
      <div className="form-control">
        <CodeField name="code" label="Code" />
      </div>
      <div className="form-control">
        <InputField name="name" label="User Name" />
      </div>
      <div className="form-control">
        <PasswordField name="password" label="Password" />
      </div>
      <div className="form-control">
        <PasswordField name="confirmedPassword" label="Confirm Password" />
      </div>
      <button
        className={clsx(
          "btn btn-block btn-primary mt-10",
          !disabled || "btn-disabled"
        )}
        onClick={handleRegisterClick}
      >
        Sign
      </button>
    </div>
  );
}