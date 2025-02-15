import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { InputField, SpinnerCheckmark } from "../../../components";

import { useChangePasswordMutation } from "../authApiSlice";

import passwordSchema from "../validations/passwordSchema";

const pt = {
  outerRoot: classNames(
    "sm:grid grid-cols-[10rem,1fr] items-start",
    "max-sm:space-y-2 max-w-2xl"
  ),
  label: "font-semibold",
  root: "rounded py-2 px-3",
};

const PasswordForm = () => {
  const navigate = useNavigate();

  const [changePassword, { isError, isLoading, isSuccess, error }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    await changePassword(data).unwrap();

    navigate("/dashboard/profile-settings");
  };

  return (
    <form className="card" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="currentPassword"
        label="Old password:"
        pt={pt}
        type="password"
        register={register}
        error={errors.currentPassword}
      />
      <InputField
        name="password"
        label="New password:"
        pt={pt}
        type="password"
        register={register}
        error={errors.password}
      />
      <InputField
        name="passwordConfirm"
        label="Confirm new password:"
        pt={pt}
        type="password"
        register={register}
        error={errors.passwordConfirm}
      />

      <div className="row">
        <Button
          label="Change Account Password"
          severity="success"
          pt={{
            root: "bg-[#3BB77E] px-6 py-2 rounded",
            label: "text-white font-medium text-sm",
          }}
          type="submit"
        />

        <SpinnerCheckmark
          isError={isError}
          error={error}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </div>
    </form>
  );
};

export default PasswordForm;
