import { useGetPopularProductsQuery } from "../productsApiSlice";

import { AsyncContentWrapper } from "../../../components";
import ProductView from "./ProductView";
import { useRef } from "react";
import { Toast } from "primereact/toast";

const PopularProducts = ({ selectedCategory }) => {
  const { isError, error, isLoading, isSuccess, data, isFetching } =
    useGetPopularProductsQuery({
      category: selectedCategory,
    });

  const toast = useRef(null);

  return (
    <>
      <Toast ref={toast} />

      <AsyncContentWrapper
        isLoading={isLoading}
        isFetching={isFetching}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        render={() => (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-x-6 gap-y-[1.875rem]">
            {data.map((product) => (
              <ProductView
                key={product.id}
                product={product}
                {...product}
                gridView={false}
                toast={toast}
              />
            ))}
          </div>
        )}
      />
    </>
  );
};

export default PopularProducts;
