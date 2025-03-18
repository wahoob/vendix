import * as yup from "yup";

export const requestStatus = ["pending", "approved", "rejected"];

const vendorSchema = yup.object().shape({
  businessName: yup.string().min(8).required(),
  businessDescription: yup.string().min(30).required(),
  businessLogo: yup.mixed().notRequired(),
  requestStatus: yup.string().oneOf(requestStatus).required(),
});

export default vendorSchema;
