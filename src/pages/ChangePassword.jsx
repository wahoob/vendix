import { useNavigate } from "react-router-dom";

import { PasswordForm } from "../features/auth";

const ChangePassword = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="row gap-4">
        <i
          className="pi pi-chevron-left text-xl cursor-pointer"
          onClick={() => navigate("/dashboard/profile-settings")}
        />
        <h1 className="text-4xl font-bold mb-1">Change Password</h1>
      </div>

      <PasswordForm />
    </div>
  );
};

export default ChangePassword;
