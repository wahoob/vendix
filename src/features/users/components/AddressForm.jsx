import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

import { InputField } from "../../../components";

import { useAddAddressMutation } from "../usersApiSlice";

import addressSchema from "../validations/addressSchema";

const AddressForm = ({ visible, onHide }) => {
  const [
    addAddress,
    { isLoading, isSuccess, isError, isUninitialized, reset },
  ] = useAddAddressMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const onSubmit = async (data) => {
    await addAddress(data).unwrap();
    setTimeout(() => {
      if (!isError) {
        resetForm();
        onHide();
      }
    }, 1000);
  };

  let closeIcon;
  if (isLoading) {
    closeIcon = "pi pi-spin pi-spinner-dotted text-xl";
  } else if (isSuccess) {
    closeIcon = "pi pi-check text-xl";
  } else if (isError) {
    closeIcon = "pi pi-info-circle";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      !isUninitialized && reset();
    }, 1000);

    return () => clearTimeout(timer);
  }, [isUninitialized, reset]);

  return (
    <Dialog
      visible={visible}
      onHide={() => {
        if (!isLoading) {
          onHide();
        }
      }}
      draggable={false}
      closeIcon={closeIcon}
      header="Add new Address"
      pt={{
        root: "w-[min(90%,500px)]",
        header: "py-4",
        closeButton: "focus:shadow-[0_0_0_0.2rem_#88EAAC]",
      }}
    >
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="country"
          placeholder="Country"
          register={register}
          error={errors.country}
        />
        <InputField
          name="state"
          placeholder="State or Governorate"
          register={register}
          error={errors.state}
        />
        <InputField
          name="city"
          placeholder="City"
          register={register}
          error={errors.city}
        />
        <InputField
          name="street"
          placeholder="Street"
          register={register}
          error={errors.street}
        />

        <Button
          label="Add Address"
          type="submit"
          pt={{
            root: "bg-[#3BB77E] py-2.5 mt-1",
            label: "text-white",
          }}
          severity="success"
        />
      </form>
    </Dialog>
  );
};

export default AddressForm;
