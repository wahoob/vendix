import ProductForm from "./ProductForm";

const ProductUpdate = ({ product, onClose }) => {
  return <ProductForm product={product} onClose={onClose} />;
};

export default ProductUpdate;
