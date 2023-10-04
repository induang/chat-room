import { withFormik } from "formik";
import LoginForm, { ILoginFormProps } from "./LoginForm";
import validator from "./validator";

interface ILoginFormDetails {
  email: string;
  password: string;
  disabled: boolean;
}

export default withFormik<ILoginFormProps, ILoginFormDetails>({
  mapPropsToValues: (props) => ({
    email: props.values.email,
    password: props.values.password,
    disabled: props.values.disabled,
  }),
  enableReinitialize: true,
  validationSchema: validator,
  handleSubmit: () => {},
  displayName: "LoginForm",
})(LoginForm);
