import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

import { InputField } from "../../../components";

import { useUpdateUserMutation } from "../usersApiSlice";

import profileSchema, { roles } from "../validations/profileSchema";

import { getChangedFields } from "../../../utils/functions.utils";

const pt = {
  label: "text-[15px]",
};

const UserUpdatePrompt = ({ visible, onHide, user }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user.fullName.firstName || "",
      lastName: user.fullName.lastName || "",
      username: user.username || "",
      phone: user.phone || "",
      email: user.email || "",
      role: user.role || "",
    },
  });

  const onSubmit = async (data) => {
    const changedFields = getChangedFields({ dirtyFields, data });

    if (Object.keys(changedFields).length) {
      const { firstName, lastName } = changedFields;
      if (firstName || lastName)
        changedFields.fullName = {
          firstName: data.firstName,
          lastName: data.lastName,
        };
      await updateUser({ ...changedFields, id: user.id }).unwrap();
      reset({ ...data });
      onHide();
    }
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      draggable={false}
      pt={{
        root: { className: "max-w-2xl" },
        header: { className: "py-2" },
        closeButton: { className: "focus:shadow-[0_0_0_0.2rem_#88EAAC]" },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <InputField
            placeholder="Type here"
            name="firstName"
            label="First name:"
            register={register}
            error={errors.firstName}
            pt={pt}
          />
          <InputField
            placeholder="Type here"
            name="lastName"
            label="Last name:"
            register={register}
            error={errors.lastName}
            pt={pt}
          />
          <InputField
            placeholder="Type here"
            name="username"
            label="Username:"
            register={register}
            error={errors.username}
            pt={pt}
          />
          <InputField
            placeholder="Type here"
            name="phone"
            label="Phone number:"
            register={register}
            error={errors.phone}
            type="number"
            pt={pt}
          />
          <InputField
            placeholder="Type here"
            name="email"
            label="Email address:"
            register={register}
            error={errors.email}
            pt={pt}
          />
          <div>
            <label className="text-[15px]">Role:</label>
            <Dropdown
              options={roles}
              placeholder="Select a Role"
              highlightOnSelect={false}
              pt={{
                root: classNames(
                  "text-sm pl-5 py-[11px] shadow-none",
                  "border border-solid rounded-lg",
                  errors.role ? "border-red-400" : "border-[#E0E2E9]",
                ),
              }}
              onChange={(e) => setValue("role", e.value, { shouldDirty: true })}
              value={watch("role")}
            />
          </div>
        </div>
        <Button
          type="submit"
          label="Update"
          icon={isLoading && "pi pi-spinner pi-spin"}
          pt={{
            root: "bg-[#3BB77E] w-full py-2 justify-center",
            label: "text-white font-normal flex-none",
            icon: "text-white",
          }}
          severity="success"
          disabled={!isDirty || isLoading}
        />
      </form>
    </Dialog>
  );
};

export default UserUpdatePrompt;
