import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";

import { InputField } from "../../../components";

import { useUpdateVendorMutation } from "../vendorsApiSlice";

import vendorSchema, { requestStatus } from "../validations/vendorSchema";

import { getChangedFields } from "../../../utils/functions.utils";

const VendorUpdatePrompt = ({ visible, onHide, vendor }) => {
  const [updateVendor, { isLoading }] = useUpdateVendorMutation();

  const {
    register,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(vendorSchema),
    defaultValues: {
      businessName: vendor.businessName || "",
      businessDescription: vendor.businessDescription || "",
      businessLogo: vendor.businessLogo || "",
      requestStatus: vendor.requestStatus || "",
    },
  });

  const onSubmit = async (data) => {
    const changedFields = getChangedFields({ dirtyFields, data });

    if (Object.keys(changedFields).length) {
      await updateVendor({ ...changedFields, id: vendor.id }).unwrap();
      reset({ ...data });
      onHide();
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <InputField
            placeholder="Type here"
            name="businessName"
            label="Business Name:"
            register={register}
            error={errors.businessName}
            pt={{ label: "text-[15px]" }}
          />

          <div>
            <label className="text-[15px]">Request Status:</label>
            <Dropdown
              options={requestStatus}
              placeholder="Select a Status"
              highlightOnSelect={false}
              pt={{
                root: classNames(
                  "text-sm pl-5 py-[11px] shadow-none",
                  "border border-solid rounded-lg",
                  errors.requestStatus ? "border-red-400" : "border-[#E0E2E9]",
                ),
              }}
              onChange={(e) =>
                setValue("requestStatus", e.value, { shouldDirty: true })
              }
              value={watch("requestStatus")}
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="text-[15px] mb-1">Business Description:</label>
            <textarea
              placeholder="Type here"
              {...register("businessDescription")}
              rows={6}
              className={classNames(
                "shadow-none text-sm border rounded resize-none",
                "px-5 py-[11px] outline-none",
                errors.businessDescription
                  ? "border-red-400"
                  : "border-[#E0E2E9]",
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          label="Update"
          icon={isLoading && "pi pi-spinner pi-spin"}
          pt={{
            root: "bg-[#3BB77E] w-full py-2 justify-center",
            label: "text-white font-normal flex-none",
            icon: "text-white",
          }}
          severity="success"
          disabled={!isDirty || isLoading}
        />
      </form>
    </Dialog>
  );
};

export default VendorUpdatePrompt;
