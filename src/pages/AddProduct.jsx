import { ProductCreate } from "../features/products";

const AddProduct = () => {
  return (
    <div className="flex flex-col space-y-4 p-4 overflow-hidden">
      <div className="flex items-center justify-between flex-shrink-0">
        <h1 className="text-4xl font-bold mb-1">Add New Product</h1>
      </div>

      <div className="card relative flex-1 overflow-hidden">
        <ProductCreate />
      </div>
    </div>
  );
};

export default AddProduct;
