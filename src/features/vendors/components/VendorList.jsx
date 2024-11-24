import { classNames } from "primereact/utils";

import { AsyncContentWrapper, OptionItem } from "../../../components";

import { useGetVendorsQuery } from "../vendorsApiSlice";

const VendorList = ({ selectedVendors, setSelectedVendors }) => {
  const { isLoading, data, isError, isSuccess, error, isFetching } =
    useGetVendorsQuery({
      fields: "businessName",
    });

  const onCheckboxChange = (id) => {
    setSelectedVendors((prev) =>
      prev.includes(id)
        ? prev.filter((vendorId) => vendorId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-1.5 overflow-y-auto">
      <h4
        className={classNames(
          "text-[#7E7E7E] text-sm font-black",
          "sticky top-0 z-20 bg-white",
          "pb-1"
        )}
      >
        Vendor
      </h4>

      <AsyncContentWrapper
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        render={() => (
          <div className="space-y-0.5">
            {data.map((vendor) => (
              <OptionItem
                key={vendor.id}
                id={vendor.id}
                label={vendor.businessName}
                isChecked={selectedVendors.includes(vendor.id)}
                onCheckboxChange={onCheckboxChange}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default VendorList;
