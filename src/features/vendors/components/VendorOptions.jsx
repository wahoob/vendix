import { classNames } from "primereact/utils";
import { useEffect } from "react";

import { AsyncContentWrapper, SelectableOption } from "../../../components";

import { useGetVendorsQuery } from "../vendorsApiSlice";

const VendorOptions = ({ selectedVendors, setSelectedVendors }) => {
  const { isLoading, data, isError, isSuccess, error, isFetching } =
    useGetVendorsQuery({
      fields: "businessName",
    });

  useEffect(() => {
    if (isSuccess && data && selectedVendors.length > 0) {
      const validVendorIds = data.vendors.map((vendor) => vendor.id);
      const validVendors = selectedVendors.filter((vendorId) =>
        validVendorIds.includes(vendorId),
      );
      if (validVendors.length !== selectedVendors.length) {
        setSelectedVendors(validVendors);
      }
    }
  }, [isSuccess, data, selectedVendors, setSelectedVendors]);

  const onCheckboxChange = (id) => {
    setSelectedVendors((prev) =>
      prev.includes(id)
        ? prev.filter((vendorId) => vendorId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="space-y-1.5 overflow-y-auto">
      <h4
        className={classNames(
          "text-[#7E7E7E] text-sm font-black",
          "sticky top-0 z-20 bg-white",
          "pb-1",
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
            {data.vendors.map((vendor) => (
              <SelectableOption
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

export default VendorOptions;
