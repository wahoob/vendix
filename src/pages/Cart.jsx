import { useRef, useState } from "react";
import { Banner, BreadCrumbNav } from "../components";
import CartHeader from "../features/cart/components/CartHeader";
import CartTable from "../features/cart/components/CartTable";
import Checkout from "../features/cart/components/Checkout";
import { Toast } from "primereact/toast";
import UserAddressesList from "../features/users/components/UserAddressesList";
import AddressForm from "../features/users/components/AddressForm";
import BillingDetails from "../features/cart/components/BillingDetails";

const Cart = () => {
  const toast = useRef(null);
  const [showAddresses, setShowAddresses] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showBilling, setShowBilling] = useState(false);

  const onShowAddresses = () => setShowAddresses(true);
  const onHideAddresses = () => setShowAddresses(false);

  const onShowAddressForm = () => setShowForm(true);
  const onHideAddressForm = () => setShowForm(false);

  const onShowBillingDetails = () => setShowBilling(true);
  const onHideBillingDetails = () => setShowBilling(false);

  return (
    <>
      <Toast ref={toast} />
      <UserAddressesList visible={showAddresses} onHide={onHideAddresses} />
      <AddressForm visible={showForm} onHide={onHideAddressForm} />
      <BillingDetails visible={showBilling} onHide={onHideBillingDetails} />

      <div className="space-y-14">
        <div className="border-b border-[#ECECEC]">
          <BreadCrumbNav />
        </div>
        <div className="container">
          <div className="grid lg:grid-cols-[1fr,24rem] gap-y-8 gap-x-10">
            <CartHeader toast={toast} />

            <div className="lg:row-start-2">
              <CartTable toast={toast} />
            </div>

            <div className="lg:row-start-2">
              <Checkout
                showAddresses={onShowAddresses}
                showForm={onShowAddressForm}
                showBilling={onShowBillingDetails}
                toast={toast}
              />
            </div>
          </div>
        </div>

        <Banner />
      </div>
    </>
  );
};

export default Cart;
