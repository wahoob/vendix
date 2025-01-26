import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useGetCartQuery } from "../cartApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentAddress } from "../../users/usersApiSlice";

const Checkout = ({ showAddresses, showForm, showBilling, toast }) => {
  const { data: cart } = useGetCartQuery();

  const currentAddress = useSelector(selectCurrentAddress);

  const showBillingPopup = () => {
    if (cart?.totalProducts) {
      showBilling();
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warn",
        detail: "Your cart is empty. Add items to proceed to checkout.",
        life: 3000,
      });
    }
  };

  return (
    <div
      className={classNames(
        "border border-[#ececec]",
        "p-4 rounded-lg font-quicksand",
        "space-y-3 shadow-shadow1"
      )}
    >
      <div
        className={classNames(
          "border border-[#ececec]",
          "[&_span]:text-sm [&_span]:font-bold [&_span]:text-[#B6B6B6]"
        )}
      >
        <div
          className={classNames(
            "row justify-between",
            "border-b-2 border-[#ececec]",
            "px-2 py-1"
          )}
        >
          <span>Subtotal</span>
          <b className="text-[#3bb77e] text-xl">${cart?.total || 0}</b>
        </div>

        <div className="h-px w-11/12 bg-[#ececec] my-2.5 mx-auto" />

        <div
          className={classNames(
            "row justify-between",
            "border-y-2 border-[#ececec]",
            "px-2 py-1"
          )}
        >
          <span>Shipping</span>
          <b className="text-[#253D4E] max-sm:text-sm">Free</b>
        </div>

        {currentAddress && (
          <div
            className={classNames(
              "row justify-between gap-4",
              "border-b-2 border-[#ececec]",
              "px-2 py-1"
            )}
          >
            <span className="whitespace-nowrap">Estimate for</span>
            <div className="row gap-1.5">
              <button
                className="text-sm text-[#3bb77e] font-bold hover:underline"
                onClick={showAddresses}
              >
                View
              </button>
              <b className="text-[#253D4E] line-clamp-1 max-sm:text-sm">
                {currentAddress.country}, {currentAddress.state}
              </b>
            </div>
          </div>
        )}
        <div
          className={classNames(
            "row justify-center gap-1",
            "border-b-2 border-[#ececec]",
            "px-2 py-1"
          )}
        >
          <span>or</span>
          <button
            className="text-[#3bb77e] hover:underline font-semibold text-sm"
            onClick={showForm}
          >
            Add new address
          </button>
        </div>

        <div className="h-px w-11/12 bg-[#ececec] my-2.5 mx-auto" />

        <div
          className={classNames(
            "row justify-between",
            "border-t-2 border-[#ececec]",
            "px-2 py-1"
          )}
        >
          <span>Total</span>
          <b className="text-[#3bb77e] text-xl">${cart?.total || 0}</b>
        </div>
      </div>

      <Button
        label="Proceed To CheckOut"
        icon="pi pi-sign-out"
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
        onClick={showBillingPopup}
      />
    </div>
  );
};

export default Checkout;
