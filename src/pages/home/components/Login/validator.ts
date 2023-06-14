import * as yup from 'yup';

const validator = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
});
export default validator;