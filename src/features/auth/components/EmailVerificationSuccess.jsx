import { useVerifyEmailMutation } from "../authApiSlice";
import { useMountEffect } from "primereact/hooks";
import { SpinnerCheckmark } from "../../../components";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const EmailVerificationSuccess = ({ code }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const onHide = () => {
    setShow(false);
    navigate("/");
  };

  const [verifyEmail, { isLoading, isSuccess, isError, error }] =
    useVerifyEmailMutation();

  useMountEffect(() => {
    if (code) verifyEmail({ code });
  });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setShow(true), 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className="row justify-center size-full">
      {show ? (
        <Dialog
          visible={show}
          onHide={onHide}
          draggable={false}
          pt={{
            root: { className: "max-w-2xl" },
            header: { className: "py-2" },
            closeButton: { className: "focus:shadow-[0_0_0_0.2rem_#88EAAC]" },
          }}
        >
          <div className="text-center">
            <i className="pi pi-verified text-9xl text-[#3BB77E] mb-6" />
            <h3 className="text-4xl font-medium text-center text-black">
              Congratulations!
            </h3>
            <p className="font-medium my-2.5">
              Your account is now ready to use. Start shopping on Vendix and
              discover great products at your convenience.
            </p>
            <Button
              label="Go to Home"
              severity="success"
              pt={{
                root: { className: "bg-[#3BB77E] px-14 py-4 rounded-full" },
                label: { className: "text-white font-semibold" },
              }}
              onClick={onHide}
            />
          </div>
        </Dialog>
      ) : (
        <SpinnerCheckmark
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          pt={{
            root: "w-40",
          }}
        />
      )}
    </div>
  );
};

export default EmailVerificationSuccess;
