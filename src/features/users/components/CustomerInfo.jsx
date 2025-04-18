import { useState } from "react";

import UserUpdatePrompt from "./UserUpdatePrompt";
import { CardInfo } from "../../../components";

const CustomerInfo = ({ customer }) => {
  const [open, setOpen] = useState(false);

  const showUpdatePrompt = () => setOpen(true);
  const hideUpdatePrompt = () => setOpen(false);

  const {
    fullName: { firstName, lastName },
    phone,
    email,
  } = customer;
  return (
    <>
      <UserUpdatePrompt
        visible={open}
        user={customer}
        onHide={hideUpdatePrompt}
      />

      <CardInfo
        title="Customer"
        icon="pi-user"
        sections={{ name: `${firstName} ${lastName}`, email, phone }}
        action="View Profile"
        onClick={showUpdatePrompt}
      />
    </>
  );
};

export default CustomerInfo;
