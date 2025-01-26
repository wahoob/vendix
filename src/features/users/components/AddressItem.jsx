import { classNames } from "primereact/utils";
import {
  useRemoveAddressMutation,
  useUpdateAddressMutation,
} from "../usersApiSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "primereact/button";
import EditAddressForm from "./EditAddressForm";
import { selectAddress, setAddress } from "../usersSlice";
import { useDispatch, useSelector } from "react-redux";

const AddressItem = ({ country, state, city, street, _id }) => {
  const [openForm, setOpenForm] = useState(false);

  const dispatch = useDispatch();
  const currentAddressId = useSelector(selectAddress);

  const setCurrentLocation = () => dispatch(setAddress({ addressId: _id }));

  const closeEdit = () => setOpenForm(false);
  const openEdit = () => setOpenForm(true);

  const [remove] = useRemoveAddressMutation();
  const removeAddress = async () => {
    await remove({ addressId: _id }).unwrap();
  };

  const schema = yup.object().shape({
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [update, { isLoading, isSuccess, isError, isUninitialized, reset }] =
    useUpdateAddressMutation();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateAddress = () => {
    setIsUpdating(true);
    setTimeout(() => {
      onSubmit();
    }, 500);
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsUpdating(false);
    await update({ addressId: _id, updatedAddress: data }).unwrap();
    setTimeout(() => {
      if (!isError) {
        closeEdit();
      }
    }, 1000);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      !isUninitialized && reset();
    }, 1500);

    return () => clearTimeout(timer);
  }, [isUninitialized, reset]);

  let icon;
  if (isUpdating || isLoading) {
    icon = "pi pi-spin pi-spinner-dotted";
  } else if (isSuccess) {
    icon = "pi pi-check";
  } else if (isError) {
    icon = "pi pi-info-circle";
  }

  return (
    <div
      className={classNames(
        "py-2.5 px-6 hover:bg-[#ECECEC] space-y-2",
        openForm && "bg-[#ECECEC]"
      )}
    >
      <div className="row justify-between gap-6 overflow-hidden relative">
        <div>
          <p className="text-sm font-bold text-neutral-800 line-clamp-1">
            {state}, {country}
          </p>
          <p className="text-xs font-medium line-clamp-1">
            {city}, {street}
          </p>
        </div>

        {openForm ? (
          <div
            className={classNames(
              "row gap-1.5 absolute transition-all duration-500",
              isLoading || isSuccess || isUpdating
                ? "-right-[3.75rem]"
                : "-right-0"
            )}
          >
            <Button
              label="Update"
              pt={{
                root: "bg-[#3BB77E] px-4 py-1",
                label: "text-xs text-white font-semibold",
                icon: "text-white text-sm",
              }}
              icon={icon}
              severity="success"
              onClick={updateAddress}
            />
            <Button
              label="Cancel"
              pt={{
                root: "bg-[#3BB77E] px-2 py-1 w-[3.75rem]",
                label: "text-xs text-white font-semibold",
              }}
              severity="success"
              onClick={closeEdit}
              disabled={isUpdating || isSuccess}
            />
          </div>
        ) : (
          <div
            className={classNames(
              "[&>*]:text-xl [&>*]:cursor-pointer text-[#7E7E7E]",
              "row gap-1.5"
            )}
          >
            <i
              className={classNames(
                "pi pi-map-marker hover:animate-bounce hover:text-[#3BB77E]",
                currentAddressId === _id && "text-[#3BB77E]"
              )}
              title={
                currentAddressId === _id
                  ? "Current Location"
                  : "Set as Location"
              }
              onClick={setCurrentLocation}
            />
            <i
              className="pi pi-file-edit hover:animate-pulse"
              title="Edit Location"
              onClick={openEdit}
            />
            <i
              className="pi pi-trash hover:text-red-400 hover:animate-shake"
              title="Delete Location"
              onClick={removeAddress}
            />
          </div>
        )}
      </div>

      {openForm && (
        <EditAddressForm
          onSubmit={onSubmit}
          errors={errors}
          register={register}
          country={country}
          state={state}
          city={city}
          street={street}
        />
      )}
    </div>
  );
};

export default AddressItem;
