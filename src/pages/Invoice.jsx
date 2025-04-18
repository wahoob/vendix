import { useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";

import { InvoiceDetails } from "../features/invoices";

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="row gap-2">
        <i
          className={classNames(
            "pi pi-chevron-left text-xl",
            "border p-1 rounded-full border-neutral-300 cursor-pointer",
          )}
          onClick={() => navigate("/dashboard/invoices")}
        />
        <h1 className="text-4xl font-bold mb-1">Invoice details</h1>
      </div>
      <InvoiceDetails id={id} />
    </div>
  );
};

export default Invoice;
