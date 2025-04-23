import { useState } from "react";
import { useGetProductsQuery } from "../productsApiSlice";
import { AsyncContentWrapper } from "../../../components";
import ProductView from "./ProductView";
import { Paginator } from "primereact/paginator";
import { classNames } from "primereact/utils";

const SellerProducts = ({ vendorId }) => {
  const [first, setFirst] = useState(0);

  const { data, ...rest } = useGetProductsQuery({
    page: first / 10 + 1,
    vendors: vendorId ? vendorId : undefined,
  });

  return (
    <AsyncContentWrapper
      {...rest}
      render={() => (
        <div className="space-y-12">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
            {data.products.map((product) => (
              <ProductView
                key={product.id}
                {...product}
                product={product}
                pt={{
                  name: "line-clamp-1 text-sm capitalize text-[#505D77] font-semibold",
                  brand: "hidden",
                  rating: "hidden",
                  businessName: "hidden",
                  buttonRoot: "hidden",
                  discount: "hidden",
                  footer: "mt-0",
                  price: "text-[#505D77] text-sm font-semibold",
                }}
              />
            ))}
          </div>

          <div className="w-fit">
            <Paginator
              totalRecords={data.total}
              first={first}
              rows={10}
              onPageChange={(e) => setFirst(e.first)}
              pt={{
                pages: { className: "row gap-[9px]" },
                pageButton: ({ context }) => ({
                  className: classNames(
                    "font-quicksand font-bold",
                    "bg-[#F2F3F4] text-[#7E7E7E]",
                    "size-10 min-w-0",
                    {
                      "bg-[#3BB77E] text-white": context.active,
                      "hover:bg-neutral-200": !context.active,
                    },
                  ),
                }),
              }}
            />
          </div>
        </div>
      )}
    />
  );
};

export default SellerProducts;
