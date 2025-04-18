import { InvoicesList } from "../features/invoices";

const Invoices = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold mb-1">Invoices list</h1>

      <div className="card">
        <InvoicesList />
      </div>
    </div>
  );
};

export default Invoices;
