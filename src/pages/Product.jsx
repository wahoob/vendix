import { BreadCrumbNav, Sidebar } from "../components";
import ProductDetails from "../features/products/components/ProductDetails";

const Product = () => {
  return (
    <>
      <div className="border-b border-[#ECECEC]">
        <BreadCrumbNav />
      </div>

      <div className="flex container mt-[30px]">
        <Sidebar />

        <ProductDetails />
      </div>
    </>
  );
};

export default Product;
