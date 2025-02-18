import { Dialog } from "primereact/dialog";
import { useUpdateUserMutation } from "../usersApiSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import profileSchema from "../validations/profileSchema";
import { InputField } from "../../../components";
import { Button } from "primereact/button";
import { useEffect } from "react";
import getChangedFields from "../utils/getChangedFields";

const pt = {
  label: "text-[15px]",
};

const UserUpdatePrompt = ({ visible, onHide, user }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("firstName", user.fullName.firstName);
      setValue("lastName", user.fullName.lastName);
      setValue("username", user.username);
      setValue("phone", user.phone || "");
      setValue("email", user.email);
      setValue("role", user.role);
    }
  }, [user, setValue]);

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
          <InputField
            placeholder="Type here"
            name="role"
            label="Role:"
            register={register}
            error={errors.role}
            pt={pt}
          />
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
