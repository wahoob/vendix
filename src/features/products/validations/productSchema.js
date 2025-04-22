import * as yup from "yup";

const productSchema = yup.object().shape({
  name: yup
    .string()
    .lowercase()
    .min(5, "Name must be at least 5 characters")
    .required("Name is required"),
  description: yup
    .string()
    .min(30, "Description must be at least 30 characters")
    .required("Description is required"),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  stockQuantity: yup
    .number()
    .integer("Stock quantity must be a whole number")
    .min(0, "Stock quantity cannot be negative")
    .required("Stock quantity is required"),
  images: yup
    .array()
    .of(yup.mixed())
    .min(1, "At least one image is required")
    .required("Images are required"),
  brand: yup.string(),
  discount: yup.object().shape({
    amount: yup.number().positive("Discount amount must be positive"),
    expiryDate: yup.date().min(new Date(), "Expiry date must be in the future"),
  }),
  category: yup.string().required("Category is required"),
  shippingInformation: yup
    .string()
    .required("Shipping information is required"),
  warrantyInformation: yup
    .string()
    .required("Warranty information is required"),
  tags: yup.array().of(yup.string()),
  isArchived: yup.boolean().required("Archived status is required"),
});

export default productSchema;
