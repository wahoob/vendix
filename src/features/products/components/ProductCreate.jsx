import { useNavigate } from "react-router-dom";

import ProductForm from "./ProductForm";

const ProductCreate = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/dashboard/products");
  };

  return <ProductForm onClose={handleClose} />;
};

export default ProductCreate;
