import * as yup from "yup";

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
  profilePicture: yup.mixed().notRequired(),
  role: yup.string().oneOf(["user", "vendor", "admin", "delivery"]).required(),
});

export default profileSchema;
