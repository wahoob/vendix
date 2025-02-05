import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

import { Google } from "../../../utils/icons.utils";

const SocialAuthButtons = () => {
  return (
    <div className="flex [&>*]:flex-1 gap-5">
      <Button
        type="button"
        icon={<Google />}
        label="Google"
        pt={{
          root: {
            className: classNames(
              "py-2 justify-center gap-4",
              "border border-[#E0E2E9] rounded-lg"
            ),
          },
          label: { className: "text-sm font-semibold flex-none" },
        }}
        severity="success"
      />
      <Button
        type="button"
        icon="pi pi-facebook"
        label="Facebook"
        pt={{
          root: {
            className: classNames(
              "py-2 justify-center gap-2",
              "border border-[#E0E2E9] rounded-lg"
            ),
          },
          icon: { className: "text-[27px] text-[#1877F2]" },
          label: { className: "text-sm font-semibold flex-none" },
        }}
        severity="success"
      />
    </div>
  );
};

export default SocialAuthButtons;
