import * as yup from "yup";

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required(),
  password: yup.string().min(8).required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
});

export default passwordSchema;
