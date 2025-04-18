import { classNames } from "primereact/utils";

import { CustomerInfo } from "../../users";
import { ProductsInOrder } from "../../products";
import { AsyncContentWrapper, CardInfo } from "../../../components";

import { useGetOrderQuery } from "../ordersApiSlice";

import { formatLongDate } from "../../../utils/functions.utils";

const OrderDetails = ({ id }) => {
  const { data, ...rest } = useGetOrderQuery({ id });

  return (
    <AsyncContentWrapper
      {...rest}
      render={() => {
        const {
          updatedAt,
          user,
          orderStatus,
          shippingAddress: { country, city, state, street },
          products,
          total,
          shippingFee,
        } = data;
        return (
          <div className="text-neutral-600">
            <div className="border-b pb-4 space-y-1.5">
              <div className="row gap-2">
                <i className="pi pi-calendar text-xl" />
                <h4 className="text-sm font-semibold">
                  {formatLongDate(updatedAt)}
                </h4>
              </div>
              <p className="text-sm text-neutral-400">Order ID: {id}</p>
            </div>

            <div
              className={classNames(
                "flex justify-between gap-x-6 gap-y-10 flex-wrap",
                "max-w-6xl py-8",
              )}
            >
              <CustomerInfo customer={user} />
              <CardInfo
                title="Order info"
                icon="pi-truck"
                sections={{
                  paymentMethod: "Payment method: pay on delivery",
                  status: `Status: ${orderStatus}`,
                }}
              />
              <CardInfo
                title="Deliver to"
                icon="pi-map-marker"
                sections={{
                  country: `Country: ${country}`,
                  state: `State: ${state}`,
                  city: `City: ${city}`,
                  street: `Street: ${street}`,
                }}
              />
            </div>

            <ProductsInOrder
              items={products}
              total={total.toFixed(2)}
              shippingFee={shippingFee.toFixed(2)}
            />
          </div>
        );
      }}
    />
  );
};

export default OrderDetails;
