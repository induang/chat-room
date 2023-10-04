import clsx from "clsx";
import { FormikFormProps, FormikValues } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/auth";
import noti from "@/utils/noti";
import InputField from "@/components/common/InputField";
import PasswordField from "@/components/common/PasswordField";
import { saltPassowrd } from "@/utils/tools";

export interface ILoginFormFields {
  email: string;
  password: string;
  disabled: boolean;
}
export interface ILoginFormProps {
  show: boolean;
  values: ILoginFormFields;
}

export default function LoginForm(
  props: FormikFormProps & FormikValues & ILoginFormProps
) {
  const { show, values, isValid } = props;
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const handleLoginClick = async () => {
    if (!isValid) {
      noti({ type: "error", message: "Invalid data." });
      return;
    }
    let { email, password } = values;
    if (!email || !password) {
      noti({ type: "error", message: "Invalid data." });
      return;
    }
    password = saltPassowrd(password);
    setDisabled(true);
    login({ email, password })
      .then((res) => {
        const { name, pic, _id } = res;
        window.localStorage.setItem("name", name);
        window.localStorage.setItem("pic", pic);
        window.localStorage.setItem("userId", _id);
        noti({ type: "success", message: "Login successfully." });
        navigate("/chat");
      })
      .finally(() => setDisabled(false));
  };

  return (
    <div className={clsx("login-tab-page", show || "hidden")}>
      <div className="form-control">
        <InputField name="email" label="Email" />
      </div>
      <div className="form-control">
        <PasswordField name="password" label="Password" />
      </div>

      <button
        className={clsx(
          "btn btn-block btn-primary mt-10",
          !disabled || "btn-disabled"
        )}
        type="submit"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
  );
}
