import { classNames } from "primereact/utils";
import { Paginator } from "primereact/paginator";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectFilters } from "../productSlice";
import { Toast } from "primereact/toast";

import { Browse, Sort } from "../../../utils/icons.utils";

import {
  AsyncContentWrapper,
  IconicDropdown,
  IconicMultiSelect,
} from "../../../components";
import ProductView from "./ProductView";

import useCustomGetProductsQuery from "../hooks/useCustomGetProductsQuery";
import { CategoryNavigationBar } from "../../categories";

const ProductsShopList = () => {
  const toast = useRef(null);

  const [selectedLimitValue, setSelectedLimitValue] = useState(10);
  const [selectedSortValues, setSelectedSortValues] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

  const changeCategories = (id) => {
    setSelectedCategories((prev) => {
      if (id === "all") return ["all"];
      if (prev.includes(id)) {
        const updated = prev.filter((categoryId) => categoryId !== id);
        return updated.length ? updated : ["all"];
      }
      return [id, ...prev.filter((categoryId) => categoryId !== "all")];
    });
  };

  const [first, setFirst] = useState(0);

  const { range, vendors, brands, search } = useSelector(selectFilters);

  const {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    data,
    error,
    isLimitFetching,
  } = useCustomGetProductsQuery({
    limit: selectedLimitValue,
    sort: selectedSortValues.join(","),
    page: first / 10 + 1,
    price: range,
    categories: selectedCategories.join(","),
    vendors,
    brands,
    search,
  });

  const limitOptions = [
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];
  const sortOptions = [
    {
      label: "Price",
      items: [
        { label: "Low to High", value: "price" },
        { label: "High to Low", value: "-price" },
      ],
    },
    {
      label: "Date",
      items: [
        { label: "Newest", value: "-createdAt" },
        { label: "Oldest", value: "createdAt" },
      ],
    },
  ];

  return (
    <>
      <Toast ref={toast} />

      <div className="flex-1 space-y-8 overflow-hidden">
        <div className="space-y-2">
          <div className="row justify-between flex-wrap gap-5">
            <p className="text-[#7E7E7E]">
              We found{" "}
              <span className="text-[#3BB77E]">{data?.total || 0}</span> items
              for you!
            </p>

            <div className="flex gap-2.5 flex-wrap">
              <IconicDropdown
                selectedOption={selectedLimitValue}
                onChange={(e) => setSelectedLimitValue(e.value)}
                options={limitOptions}
                Icon={Browse}
                fixedPlaceholder="Show: "
                pt={{
                  root: {
                    className: classNames(
                      "gap-2.5 py-3 px-5",
                      "border border-[#ECECEC] border-solid rounded-[10px]",
                    ),
                  },
                  trigger: { className: "size-2" },
                  item: { className: "text-[13px] text-[#777777]" },
                }}
                partClassNames={{
                  root: "row gap-2.5 text-[13px]",
                  icon: "text-[#ABABAB] size-3.5",
                  text: "text-[#777777]",
                  option: "text-[#7E7E7E]",
                }}
              />

              <IconicMultiSelect
                options={sortOptions}
                fixedPlaceholder="Sort by: "
                Icon={Sort}
                onChange={(e) => setSelectedSortValues(e.values)}
                pt={{
                  root: classNames(
                    "gap-2.5 py-3 px-5",
                    "border border-[#ECECEC] border-solid rounded-[10px]",
                  ),
                  icon: "text-[7.6px] size-1 text-[#7E7E7E]",
                  groupLabel: "text-sm font-bold text-[#253D4E]",
                  item: "text-[13px] text-[#777777]",
                  checkboxSize: 13,
                }}
                partClassNames={{
                  root: "gap-2.5",
                  icon: "text-[#ABABAB] size-3.5",
                  text: "text-[13px] font-medium text-[#777777]",
                  selectedItems: "text-[#7E7E7E]",
                }}
              />
            </div>
          </div>

          <div className="max-w-full">
            <CategoryNavigationBar
              selected={selectedCategories}
              onChange={changeCategories}
            />
          </div>
        </div>

        <div>
          <AsyncContentWrapper
            isFetching={isFetching}
            loadOnFetch={!isLimitFetching}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            error={error}
            render={() => (
              <div className="space-y-12">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-x-6 gap-y-[1.875rem]">
                  {data.products.map((product) => (
                    <ProductView
                      key={product.id}
                      {...product}
                      product={product}
                      gridView={false}
                      toast={toast}
                    />
                  ))}
                </div>
                {isLimitFetching && "Loading..."}

                <div className="w-fit">
                  <Paginator
                    totalRecords={data.total}
                    first={first}
                    rows={selectedLimitValue}
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
        </div>
      </div>
    </>
  );
};

export default ProductsShopList;
