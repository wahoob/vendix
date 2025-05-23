import { classNames } from "primereact/utils";
import { useEffect } from "react";

import { AsyncContentWrapper, SelectableOption } from "../../../components";

import { useGetBrandsQuery } from "../productsApiSlice";

const BrandOptions = ({ selectedBrands, setSelectedBrands }) => {
  const { isLoading, data, isError, isSuccess, error, isFetching } =
    useGetBrandsQuery();

  useEffect(() => {
    if (isSuccess && data && selectedBrands.length > 0) {
      const validBrands = selectedBrands.filter((brand) =>
        data.includes(brand),
      );
      if (validBrands.length !== selectedBrands.length) {
        setSelectedBrands(validBrands);
      }
    }
  }, [isSuccess, data, selectedBrands, setSelectedBrands]);

  const onCheckboxChange = (id) => {
    setSelectedBrands((prev) =>
      prev.includes(id)
        ? prev.filter((brandsId) => brandsId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="overflow-y-auto">
      <div className="space-y-1.5">
        <h4
          className={classNames(
            "text-[#7E7E7E] text-sm font-black",
            "sticky top-0 z-20 bg-white",
            "pb-1",
          )}
        >
          Brand
        </h4>

        <AsyncContentWrapper
          isSuccess={isSuccess}
          isError={isError}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
          render={() => (
            <div>
              {data.map((brand) => (
                <SelectableOption
                  key={brand}
                  id={brand}
                  label={brand}
                  isChecked={selectedBrands.includes(brand)}
                  onCheckboxChange={onCheckboxChange}
                />
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default BrandOptions;
