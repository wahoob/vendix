import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { sentEmail } from "../../../assets/images";
import { useResendVerifyMutation } from "../authApiSlice";
import { useRef } from "react";

const EmailVerificationPrompt = ({ visible, onHide, email }) => {
  const [resendVerify] = useResendVerifyMutation();
  const toast = useRef(null);

  const resend = async () => {
    try {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Sending Email...",
        life: 3000,
      });
      await resendVerify({ email }).unwrap();
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Email has been sent.",
        life: 3000,
      });
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.data.message,
        life: 3000,
      });
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
      <div className="text-sm font-medium [&>p]:text-neutral-500 text-center">
        <div className="max-w-40 mx-auto">
          <img src={sentEmail} alt="email" />
        </div>
        <h3 className="text-4xl font-light text-center">
          Verify your email address
        </h3>
        <p className="mb-4 mt-2">
          We&lsquo;ve sent you an email to complete your account registration.
          If you don&lsquo;t reveive the email in 5 minutes, be sure to check
          your spam folder as well.
        </p>
        <p className="mb-6">
          <strong>Note:</strong> The verification link is active for only 10
          minutes. Please verify your email before the link expires.
        </p>
        <Toast ref={toast} />
        <Button
          label="Resend Verification Email"
          severity="success"
          pt={{
            root: { className: "bg-[#3BB77E] px-10 py-4 rounded-full" },
            label: { className: "text-white font-semibold" },
          }}
          onClick={resend}
        />
      </div>
    </Dialog>
  );
};

export default EmailVerificationPrompt;
