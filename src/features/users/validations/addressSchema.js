import * as yup from "yup";

const addressSchema = yup.object().shape({
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
});

export default addressSchema;
