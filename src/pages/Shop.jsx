import { BreadCrumbNav, Sidebar } from "../components";
import { ProductsList, ProductFilterSearch } from "../features/products";

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
