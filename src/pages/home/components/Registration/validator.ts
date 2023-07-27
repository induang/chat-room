import * as yup from "yup";

const validator = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmedPassword: yup
    .mixed()
    .test("match", "password do not match", function (password) {
      return password === this.parent.password;
    })
    .required("password is required field"),
  code: yup.string().length(6).required(),
});
export default validator;
