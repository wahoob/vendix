import { useState } from "react";

import { VendorsList, VendorUpdatePrompt } from "../features/vendors";

const Vendors = () => {
  const [vendorData, setVendorData] = useState(null);

  const showUpdatePrompt = (data) => {
    setVendorData(data);
  };
  const hideUpdatePrompt = () => setVendorData(null);

  return (
    <>
      {!!vendorData && (
        <VendorUpdatePrompt
          visible={!!vendorData}
          vendor={vendorData}
          onHide={hideUpdatePrompt}
        />
      )}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold mb-1">Users list</h1>

        <div className="card">
          <VendorsList show={showUpdatePrompt} />
        </div>
      </div>
    </>
  );
};

export default Vendors;
