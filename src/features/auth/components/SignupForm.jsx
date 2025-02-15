import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Link, useOutletContext } from "react-router-dom";
import { Divider } from "primereact/divider";

import SocialAuthButtons from "./SocialAuthButtons";
import { InputField, SpinnerCheckmark } from "../../../components";

import { useSignupMutation } from "../authApiSlice";

import signupSchema from "../validations/signupSchema";

const SignupForm = () => {
  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();
  const { showPrompt } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    await signup({
      ...data,
      fullName: { firstName: data.firstName, lastName: data.lastName },
    }).unwrap();
    showPrompt(data.email, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-10">
        <div className="row gap-2">
          <h1 className="text-3xl font-semibold">Sign Up</h1>
          <SpinnerCheckmark
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
          />
        </div>

        <form
          className="flex flex-col gap-2.5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-1.5">
            <InputField
              name="firstName"
              placeholder="First name"
              register={register}
              error={errors.firstName}
            />
            <InputField
              name="lastName"
              placeholder="Last name"
              register={register}
              error={errors.lastName}
            />
          </div>
          <InputField
            name="email"
            placeholder="Email address"
            icon="pi pi-envelope"
            register={register}
            error={errors.email}
          />
          <InputField
            name="username"
            placeholder="Username"
            register={register}
            error={errors.username}
          />
          <InputField
            name="password"
            type="password"
            icon="pi pi-key"
            placeholder="Password"
            register={register}
            error={errors.password}
          />
          <InputField
            name="passwordConfirm"
            type="password"
            icon="pi pi-key"
            placeholder="Confirm pasasword"
            register={register}
            error={errors.passwordConfirm}
          />

          <Button
            type="submit"
            label="Sign Up"
            pt={{
              root: {
                className: "w-full bg-[#3BB77E] text-white py-[11px] mt-2.5",
              },
              label: { className: "text-[15px] font-semibold" },
            }}
            severity="success"
          />
        </form>

        <Divider
          pt={{
            root: { className: "w-full h-px bg-[#E4E6EC]" },
          }}
        >
          <span className="text-sm font-medium text-[#969AB8] px-2">or</span>
        </Divider>

        <SocialAuthButtons />
      </div>

      <p className="text-[15px] text-[#969AB8]">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-[#3BB77E] font-semibold">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
