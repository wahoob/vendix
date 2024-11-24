import { classNames } from "primereact/utils";
import { Slider } from "primereact/slider";
import { useEffect } from "react";

import { AsyncContentWrapper } from "../../../components";

import { useGetPriceRageQuery } from "../productsApiSlice.js";

const PriceSlider = ({ values, setValue }) => {
  const { isLoading, data, isError, error, isSuccess, isFetching } =
    useGetPriceRageQuery();

  useEffect(() => {
    if (isSuccess && data) {
      setValue([data.minPrice, data.maxPrice]);
    }
  }, [isSuccess, data, setValue]);

  const changeRange = (e) => setValue(e.value);

  return (
    <AsyncContentWrapper
      isSuccess={isSuccess}
      isError={isError}
      isLoading={isLoading}
      isFetching={isFetching}
      error={error}
      render={() => (
        <div className="space-y-6">
          <Slider
            range
            min={data.minPrice}
            max={data.maxPrice}
            value={values}
            onChange={changeRange}
            pt={{
              range: { className: "bg-[#3BB77E]" },
              handle: { className: "bg-[#3BB77E] hover:bg-[#319969]" },
              root: { className: "bg-[#D6D7D9]" },
            }}
          />

          <div
            className={classNames(
              "row justify-between",
              "text-sm text-[#7E7E7E]"
            )}
          >
            <p>
              From:{" "}
              <span className="text-[#3BB77E] font-semibold">${values[0]}</span>
            </p>
            <p>
              To:{" "}
              <span className="text-[#3BB77E] font-semibold">${values[1]}</span>
            </p>
          </div>
        </div>
      )}
    />
  );
};

export default PriceSlider;
