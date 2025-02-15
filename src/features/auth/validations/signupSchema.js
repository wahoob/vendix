import * as yup from "yup";

const signupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
});

export default signupSchema;
