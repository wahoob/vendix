import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, InputField, SpinnerCheckmark } from "../../../components";
import { Button } from "primereact/button";
import { useSendLoginMutation } from "../authApiSlice.js";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { usePersist } from "../../../hooks";
import { Divider } from "primereact/divider";
import SocialAuthButtons from "./SocialAuthButtons.jsx";

const LoginForm = () => {
  const [persist, setPersist] = usePersist();
  const { showPrompt } = useOutletContext();

  const [login, { isLoading, isSuccess, isError, error }] =
    useSendLoginMutation();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login({ ...data, isLoginAttempt: true }).unwrap();
    } catch (err) {
      if (err.status === 403) {
        showPrompt(data.email);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="space-y-4">
      <div className="space-y-10">
        <div className="row gap-2">
          <h1 className="text-3xl font-semibold">Log In</h1>
          <SpinnerCheckmark
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
          />
        </div>

        <div className="space-y-2.5">
          <form
            className="flex flex-col gap-2.5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              name="email"
              placeholder="Email address"
              icon="pi pi-envelope"
              register={register}
              error={errors.email}
            />
            <InputField
              name="password"
              type="password"
              icon="pi pi-key"
              placeholder="Password"
              register={register}
              error={errors.password}
            />

            <Button
              type="submit"
              label="Log In"
              pt={{
                root: {
                  className: "w-full bg-[#3BB77E] text-white py-[11px] mt-2.5",
                },
                label: { className: "text-[15px] font-semibold" },
              }}
              severity="success"
            />
          </form>

          <div className="row justify-between">
            <div className="flex gap-2">
              <Checkbox
                inputId="persist"
                checked={persist}
                onChange={() => setPersist((prev) => !prev)}
              />
              <span className="text-sm text-[#969AB8]">Remember me?</span>
            </div>
            <Link
              to="/auth/forget-password"
              className="text-[15px] font-semibold text-[#3BB77E]"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Divider
          pt={{
            root: { className: "w-full h-px bg-[#E4E6EC]" },
          }}
        >
          <span className="text-sm font-medium text-[#969AB8] px-2">or</span>
        </Divider>

        <SocialAuthButtons />
      </div>

      <p className="text-[15px] text-[#969AB8] order-10">
        Don&apos;t have an account?{" "}
        <Link
          to={!isLoading && "/auth/signup"}
          className="text-[#3BB77E] font-semibold"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
