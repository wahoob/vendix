import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import { person } from "../../../assets/images";

import { AsyncContentWrapper, InputField } from "../../../components";

import { useGetMeQuery, useUpdateMeMutation } from "../usersApiSlice";
import { useUpdateEmailMutation } from "../../auth";

import { getChangedFields } from "../../../utils/functions.utils";

import profileSchema from "../validations/profileSchema";

const allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
];
const sizeLimit = 5 * 1024 * 1024;

const ProfileForm = ({ show }) => {
  const [file, setFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: userData,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    error,
  } = useGetMeQuery();
  const [updateEmail] = useUpdateEmailMutation();
  const [updateMe] = useUpdateMeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const onSubmit = async (data) => {
    setIsUpdating(true);

    try {
      const changedFields = getChangedFields({ dirtyFields, data });

      if (changedFields.email) {
        await updateEmail({ email: changedFields.email }).unwrap();
        show({ email: data.email });
      }

      const { email: _email, ...otherFields } = changedFields;

      if (Object.keys(otherFields).length > 0) {
        const formData = new FormData();

        Object.entries(otherFields).forEach(([key, value]) => {
          formData.append(key, value);
        });

        await updateMe(formData).unwrap();
      }

      reset({ ...data });
      // TODO: Prompt of success.
    } catch {
      // TODO: Prompt of error.
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFileChange = async (event) => {
    const fileUploaded = event.target.files[0];

    if (
      fileUploaded &&
      allowedTypes.includes(fileUploaded.type) &&
      fileUploaded.size <= sizeLimit
    ) {
      setFile(fileUploaded);
      setValue("image", fileUploaded);
    }
  };

  const pt = {
    label: "font-semibold",
    root: "bg-[#F4F5F9] px-7 py-4 mt-1",
    input: "bg-[#F4F5F9] placeholder:text-[#BFC5CC]",
  };

  return (
    <AsyncContentWrapper
      isError={isError}
      error={error}
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
      render={() => {
        const { fullName, username, phone, email, image } = userData;

        return (
          <form
            className="font-lato text-[#4F5D77] space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex max-md:flex-col items-start gap-5">
              <div
                className={classNames(
                  "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-y-6",
                  "flex-1 w-full md:max-w-[75%]",
                )}
              >
                <InputField
                  placeholder="Type here"
                  name="firstName"
                  label="First name"
                  pt={pt}
                  initialValue={fullName.firstName}
                  register={register}
                  error={errors.firstName}
                />
                <InputField
                  placeholder="Type here"
                  name="lastName"
                  label="Last name"
                  pt={pt}
                  initialValue={fullName.lastName}
                  register={register}
                  error={errors.lastName}
                />
                <InputField
                  placeholder="Type here"
                  name="username"
                  label="Username"
                  pt={pt}
                  initialValue={username}
                  register={register}
                  error={errors.username}
                />
                <InputField
                  placeholder="Type here"
                  name="phone"
                  label="Phone"
                  pt={pt}
                  initialValue={phone}
                  register={register}
                  error={errors.phone}
                  type="number"
                />
                <InputField
                  placeholder="Type here"
                  name="email"
                  label="Email Address"
                  pt={{
                    ...pt,
                    outerRoot: "sm:col-span-2",
                  }}
                  initialValue={email}
                  register={register}
                  error={errors.email}
                />
              </div>

              <div className="mx-auto max-md:order-first row flex-col gap-6">
                <img
                  src={file ? URL.createObjectURL(file) : image || person}
                  alt="person"
                  className="size-52 lg:size-60 object-cover rounded-full"
                />

                <label
                  className={classNames(
                    "border-2 border-[#CFE4E3]",
                    "row gap-1.5 px-4 py-2 rounded",
                    "max-w-60 cursor-pointer",
                  )}
                >
                  <i className="pi pi-cloud-upload" />
                  <p className="line-clamp-1 font-bold">
                    {file ? file.name : "Upload"}
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    placeholder="Type here"
                    className="hidden"
                    {...register("image", {
                      onChange: handleFileChange,
                      value: file,
                    })}
                  />
                </label>
              </div>
            </div>

            <Button
              label="Save changes"
              pt={{
                root: "bg-[#3BB77E] px-10 py-3.5 md:py-2.5 max-md:w-full",
                label: "text-white font-normal",
              }}
              type="submit"
              severity="success"
              disabled={!isDirty || isUpdating}
            />
          </form>
        );
      }}
    />
  );
};

export default ProfileForm;
