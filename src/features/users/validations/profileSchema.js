import * as yup from "yup";

// TODO: change location later
export const roles = ["user", "vendor", "admin", "delivery"];

const phoneRegex =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const profileSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  phone: yup
    .string()
    .notRequired()
    .test({
      test: (val) => {
        return !val || phoneRegex.test(val);
      },
    }),
  email: yup.string().email().required(),
  image: yup.mixed().notRequired(),
});

export default profileSchema;
