import { useGetPopularProductsQuery } from "../productsApiSlice";

import { AsyncContentWrapper } from "../../../components";
import ProductView from "./ProductView";

const PopularProducts = ({ selectedCategory }) => {
  const { isError, error, isLoading, isSuccess, data, isFetching } =
    useGetPopularProductsQuery({
      category: selectedCategory,
    });

  return (
    <AsyncContentWrapper
      isLoading={isLoading}
      isFetching={isFetching}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
      render={() => (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-x-6 gap-y-[1.875rem]">
          {data.map((product) => (
            <ProductView key={product.id} {...product} gridView={false} />
          ))}
        </div>
      )}
    />
  );
};

export default PopularProducts;
