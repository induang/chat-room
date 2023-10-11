import { withFormik } from "formik";
import LoginForm, { ILoginFormProps } from "./LoginForm";
import validator from "./validator";

interface ILoginFormDetails {
  email: string;
  password: string;
}

export default withFormik<ILoginFormProps, ILoginFormDetails>({
  mapPropsToValues: (props) => ({
    email: props.values.email,
    password: props.values.password,
  }),
  enableReinitialize: true,
  validationSchema: validator,
  handleSubmit: () => {},
  displayName: "LoginForm",
})(LoginForm);
