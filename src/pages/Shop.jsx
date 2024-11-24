import { BreadCrumbNav, Sidebar } from "../components";
import ProductsList from "../features/products/components/ProductsList";
import ProductFilterSearch from "../features/products/components/ProductFilterSearch";

const Shop = () => {
  return (
    <>
      <div className="border-b border-[#ECECEC]">
        <BreadCrumbNav />
      </div>

      <div className="py-14 space-y-20 container">
        <ProductFilterSearch />

        <div className="flex">
          <Sidebar />

          <ProductsList />
        </div>
      </div>
    </>
  );
};

export default Shop;
