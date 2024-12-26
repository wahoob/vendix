import { Outlet, useLocation } from "react-router-dom";
import { classNames } from "primereact/utils";
import EmailVerificationPrompt from "../features/auth/components/EmailVerificationPrompt";
import { useState } from "react";

const AuthWrapper = () => {
  const { pathname } = useLocation();
  const [emailForPrompt, setEmailForPrompt] = useState(null);

  const showPrompt = (email, delay = 0) =>
    setTimeout(() => setEmailForPrompt(email), delay);
  const hidePrompt = () => setEmailForPrompt(null);

  const isLoginPage = pathname === "/auth/login";

  return (
    <div className="size-full font-poppins relative">
      <div
        className={classNames(
          "bg-auth-login bg-center bg-cover h-full w-[58%]",
          "absolute -z-10 right-0 max-lg:hidden",
          "transition-opacity duration-1000",
          isLoginPage ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={classNames(
          "bg-auth-signup bg-left-bottom bg-cover h-full w-[58%]",
          "absolute -z-10 max-lg:hidden",
          "transition-opacity duration-1000",
          isLoginPage ? "opacity-0" : "opacity-100"
        )}
      />

      <div
        className={classNames(
          "flex flex-col absolute max-lg:hidden",
          "max-w-2xl mt-16 transition-all duration-1000",
          isLoginPage ? "left-1/2" : "left-[29%] -translate-x-1/2"
        )}
      >
        <h3
          className={classNames(
            "text-3xl [&_span]:text-[#3BB77E] [&_span]:font-semibold"
          )}
        >
          Join us today! Log in to continue or <span>create an account</span>{" "}
          and start your journey now!
        </h3>
      </div>

      <div
        className={classNames(
          "row justify-center h-full w-full lg:w-[42%]",
          "lg:absolute top-0 bg-white z-20",
          "transition-all duration-1000",
          {
            "left-0": isLoginPage,
            "left-[58%]": !isLoginPage,
          }
        )}
      >
        <div className="w-full max-w-lg px-4">
          <Outlet context={{ showPrompt }} />
          <EmailVerificationPrompt
            visible={!!emailForPrompt}
            email={emailForPrompt}
            onHide={hidePrompt}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
