import { Outlet } from "react-router-dom";
import { store } from "../app/store";
import { categoriesApiSlice } from "../features/categories/categoriesApiSlice";
// import { productsApiSlice } from "../features/products/productsApiSlice";
import { useEffect } from "react";

const UserPrefetch = () => {
  useEffect(() => {
    const categories = store.dispatch(
      categoriesApiSlice.endpoints.getCategories.initiate()
    );
    // const products = store.dispatch(
    //   productsApiSlice.endpoints.getProducts.initiate()
    // );

    return () => {
      categories.unsubscribe();
      // products.unsubscribe();
    };
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default UserPrefetch;
