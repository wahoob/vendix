export { default as StatsPanel } from "./components/StatsPanel";
export { default as SaleStatisticsChart } from "./components/SaleStatisticsChart";
export { default as RevenueStatusChart } from "./components/RevenueStatusChart";
export { default as TopSellingCategories } from "./components/TopSellingCategories";
export { default as PopularProducts } from "./components/PopularProducts";
export { default as DealsProducts } from "./components/DealsProducts";
export { default as ProductDetails } from "./components/ProductDetails";
export { default as ProductsList } from "./components/ProductsList";
export { default as ProductFilterSearch } from "./components/ProductFilterSearch";
export { default as ProductLookup } from "./components/ProductLookup";
export { default as BrandOptions } from "./components/BrandOptions";
export { default as PriceSlider } from "./components/PriceSlider";
export { default as ProductsInOrder } from "./components/ProductsInOrder";

export {
  useGetProductsQuery,
  useGetPopularProductsQuery,
  useSearchProductsQuery,
  useGetBrandsQuery,
  useGetPriceRageQuery,
  useGetDealsQuery,
  useGetProductBySlugQuery,
  useGetProductsOverviewQuery,
} from "./productsApiSlice";

export {
  setFilters,
  resetFilters,
  showSearchResults,
  hideSearchResults,
  selectFilters,
  selectProductsUI,
} from "./productSlice";
export { default as productsReducer } from "./productSlice";
