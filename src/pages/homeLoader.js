import { store } from "../app/store";
import { productsApiSlice } from "../features/products/productsApiSlice";
import { categoriesApiSlice } from "../features/categories/categoriesApiSlice";
import { vendorsApiSlice } from "../features/vendors/vendorsApiSlice";

export async function homeLoader() {
  const categoriesPromise = store
    .dispatch(categoriesApiSlice.endpoints.getCategories.initiate({}))
    .unwrap();

  const popularProductsPromise = store
    .dispatch(
      productsApiSlice.endpoints.getPopularProducts.initiate({
        category: "all",
      }),
    )
    .unwrap();

  const dealsPromise = store
    .dispatch(productsApiSlice.endpoints.getDeals.initiate())
    .unwrap();

  const brandsPromise = store
    .dispatch(productsApiSlice.endpoints.getBrands.initiate())
    .unwrap();

  const priceRangePromise = store
    .dispatch(productsApiSlice.endpoints.getPriceRage.initiate())
    .unwrap();

  const vendorsPromise = store
    .dispatch(
      vendorsApiSlice.endpoints.getVendors.initiate({ fields: "businessName" }),
    )
    .unwrap();

  const [categories, popularProducts, deals, brands, priceRange, vendors] =
    await Promise.all([
      categoriesPromise,
      popularProductsPromise,
      dealsPromise,
      brandsPromise,
      priceRangePromise,
      vendorsPromise,
    ]);

  return {
    categories,
    popularProducts,
    deals,
    brands,
    priceRange,
    vendors,
  };
}
