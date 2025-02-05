import { useRef } from "react";
import { Toast } from "primereact/toast";

import { Banner, BreadCrumbNav } from "../components";
import { WishlistList } from "../features/wishlist";

const Wishlist = () => {
  const toast = useRef(null);

  return (
    <>
      <Toast ref={toast} />

      <div className="space-y-14">
        <div className="border-b border-[#ECECEC]">
          <BreadCrumbNav />
        </div>
        <div className="container">
          <WishlistList toast={toast} />
        </div>
        <Banner />
      </div>
    </>
  );
};

export default Wishlist;
