import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { classNames } from "primereact/utils";

import { ProfileForm } from "../features/users";
import { EmailVerificationPrompt } from "../features/auth";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailForPrompt, setEmailForPrompt] = useState("");

  const showPrompt = ({ email }) => {
    setShowEmailPrompt(true);
    setEmailForPrompt(email);
  };
  const hidePrompt = () => setShowEmailPrompt(false);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-1">Profile Settings</h1>

      <div className="bg-white py-6 card border border-[#EEEEEE]">
        <ProfileForm show={showPrompt} />
        <EmailVerificationPrompt
          visible={showEmailPrompt}
          email={emailForPrompt}
          onHide={hidePrompt}
        />

        <div
          className={classNames(
            "border-t border-[#E9EAEC] py-8",
            "flex [&>*]:flex-1 gap-4 md:gap-x-8 flex-wrap"
          )}
        >
          <div
            className={classNames(
              "flex justify-between items-start gap-4 sm:gap-12 max-sm:flex-col",
              "border border-[#EEEEEE] bg-[#F8F9FA] px-5 py-4 rounded",
              "max-w-lg"
            )}
          >
            <div>
              <b className="text-[#495057]">Password</b>
              <p className="text-sm font-medium text-[#ADB5BD] min-w-52">
                You can reset or change your password by clicking here
              </p>
            </div>

            <Button
              label="Change"
              pt={{
                root: "border border-[#C0DBD9] px-4 py-2",
              }}
              severity="secondary"
              onClick={() => navigate("password")}
            />
          </div>

          <div
            className={classNames(
              "flex justify-between items-start gap-4 sm:gap-12 max-sm:flex-col",
              "border border-[#EEEEEE] bg-[#F8F9FA] px-5 py-4 rounded",
              "max-w-lg"
            )}
          >
            <div>
              <b className="text-[#495057]">Remove account</b>
              <p className="text-sm font-medium text-[#ADB5BD] min-w-52">
                Once you delete your account, there is no going back.
              </p>
            </div>

            <Button
              label="Deactivate"
              pt={{
                root: "border border-[#C0DBD9] px-4 py-2",
              }}
              severity="secondary"
              onClick={() => navigate("deactivate")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
