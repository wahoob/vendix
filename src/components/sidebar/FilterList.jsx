import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Filter } from "../../utils/icons.utils";

import { VendorList } from "../../features/vendors";
import { BrandsList, PriceSlider } from "../../features/products";
import { TitleLabel } from "../";

import { setFilters } from "../../features/products";

const FilterList = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [rangeValues, setRangeValues] = useState([0, 0]);

  const filterAndNavigate = () => {
    dispatch(setFilters({ filterType: "range", value: rangeValues }));
    dispatch(setFilters({ filterType: "vendors", value: selectedVendors }));
    dispatch(setFilters({ filterType: "brands", value: selectedBrands }));

    if (pathname !== "/shop") navigate("/shop");
  };

  return (
    <div className="flex">
      <div
        className={classNames(
          "border border-[#ECECEC] rounded-2xl shadow-shadow1",
          "pb-[31px] space-y-[30px] min-w-full shrink-0"
        )}
      >
        <TitleLabel title="Fill by Price" />

        <div className="space-y-3">
          <div className="px-[31px]">
            <PriceSlider values={rangeValues} setValue={setRangeValues} />
          </div>

          <div className="space-y-6 [&>*]:h-[8.25rem] [&>*]:overflow-y-auto [&>*]:px-[31px]">
            <VendorList
              selectedVendors={selectedVendors}
              setSelectedVendors={setSelectedVendors}
            />

            <BrandsList
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
            />
          </div>

          <div className="px-[31px]">
            <Button
              type="button"
              label="Fliter"
              icon={<Filter />}
              pt={{
                root: {
                  className: classNames(
                    "bg-[#3BB77E]",
                    "row gap-2",
                    "px-7 py-3"
                  ),
                },
                label: {
                  className: "font-quicksand font-bold text-xs text-white",
                },
              }}
              severity="success"
              onClick={filterAndNavigate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterList;
