import { useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";

import { OrderDetails } from "../features/orders";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div>
        <div className="row gap-2">
          <i
            className={classNames(
              "pi pi-chevron-left text-xl",
              "border p-1 rounded-full border-neutral-300 cursor-pointer",
            )}
            onClick={() => navigate("/dashboard/orders")}
          />
          <h1 className="text-4xl font-bold mb-1">Order details</h1>
        </div>
        <p className="text-[13px] font-medium text-neutral-500">
          Details for Order ID: {id}
        </p>
      </div>

      <div className="card border">
        <OrderDetails id={id} />
      </div>
    </div>
  );
};

export default Order;
