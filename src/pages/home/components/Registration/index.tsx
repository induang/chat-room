import { withFormik } from "formik";
import RegistrationForm, { IRegistrationFormProps } from "./RegistrationForm";
import validator from "./validator";

interface IRegistrationFormDetails {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
  code: string;
  disabled: boolean;
}

export default withFormik<IRegistrationFormProps, IRegistrationFormDetails>({
  enableReinitialize: true,
  validationSchema: validator,
  handleSubmit: async (values) => {},
  displayName: "RegistrationForm",
})(RegistrationForm);
