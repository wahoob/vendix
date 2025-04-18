import { OrdersList } from "../features/orders";

const Orders = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold mb-1">Orders list</h1>

      <div className="card">
        <OrdersList />
      </div>
    </div>
  );
};

export default Orders;
