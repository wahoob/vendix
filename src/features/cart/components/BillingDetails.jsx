import { Dialog } from "primereact/dialog";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

import { InputField, ProgressStepper } from "../../../components";
import CartSummary from "./CartSummary";

import { useCheckoutMutation } from "../cartApiSlice";
import { selectCurrentAddress } from "../../users";

const BillingDetails = ({ visible, onHide }) => {
  const stepperRef = useRef(null);
  const [checkout, { isLoading, isError, isSuccess }] = useCheckoutMutation();

  const currentAddress = useSelector(selectCurrentAddress);

  const checkoutCart = async () => {
    await checkout({
      paymentStatus: "payOnDelivery",
      shippingAddress: currentAddress,
    }).unwrap();
    stepperRef.current.next();
  };

  let icon;
  if (isLoading) {
    icon = "pi pi-spinner-dotted pi-spin";
  } else if (isSuccess) {
    icon = "pi pi-check";
  } else if (isError) {
    icon = "pi pi-exclamation-triangle";
  } else {
    icon = "pi pi-check-circle";
  }

  return (
    <Dialog
      visible={visible}
      draggable={false}
      onHide={onHide}
      pt={{
        root: "w-[min(90%,1250px)]",
        header: "pb-0 pt-2 sm:hidden",
        content: "py-0 px-2",
        closeButton: "focus:shadow-[0_0_0_0.2rem_#88EAAC]",
      }}
    >
      <div className="row justify-between pt-8 pb-6 px-4 sm:px-10 lg:px-24 max-sm:hidden">
        <Button
          label="Cancel"
          pt={{
            label: "text-sm",
          }}
          onClick={onHide}
          severity="success"
        />

        <ProgressStepper
          ref={stepperRef}
          initial={1}
          steps={["Shopping cart", "Checkout", "Finish"]}
        />
      </div>

      <div
        className={classNames(
          "bg-[#F5F5F5] py-10 px-4 sm:px-10 lg:px-24",
          "grid lg:grid-cols-2 gap-y-8 gap-x-24"
        )}
      >
        <div>
          <h3 className="text-2xl font-semibold text-black">Billing details</h3>

          <form
            onSubmit={(e) => e.preventDefault()}
            className={classNames(
              "mt-2 flex flex-col gap-0.5",
              "[&>label]:font-medium"
            )}
          >
            <label>Country</label>
            <InputField
              name="country"
              initialValue={currentAddress?.country}
              pt={{
                root: "bg-white p-2",
                input: "bg-white",
              }}
              disabled
            />
            <label>State or governorate</label>
            <InputField
              name="state"
              initialValue={currentAddress?.state}
              pt={{
                root: "bg-white p-2",
                input: "bg-white",
              }}
              disabled
            />
            <label>City</label>
            <InputField
              name="city"
              initialValue={currentAddress?.city}
              pt={{
                root: "bg-white p-2",
                input: "bg-white",
              }}
              disabled
            />
            <label>Street</label>
            <InputField
              name="street"
              initialValue={currentAddress?.street}
              pt={{
                root: "bg-white p-2",
                input: "bg-white",
              }}
              disabled
            />
          </form>

          <div className="space-y-2 mt-6">
            <p className="text-xs">
              Please keep an eye on your inbox at example@gmail.com for updates.
            </p>
            <Button
              label="Place order"
              iconPos="right"
              pt={{
                root: classNames(
                  "w-full justify-center",
                  "bg-[#3BB77E] py-2.5 gap-2"
                ),
                label: "text-white flex-none text-sm font-semibold",
                icon: "text-white text-sm",
              }}
              severity="success"
              onClick={checkoutCart}
              icon={icon}
              disabled={isSuccess}
            />
          </div>
        </div>

        {/* TODO: create component showing the order number and button for continue shopping and button show details on the order */}
        {isSuccess ? (
          <span>Thank you for your purchase! (more later on)</span>
        ) : (
          <CartSummary onHide={onHide} />
        )}
      </div>
    </Dialog>
  );
};

export default BillingDetails;
