import { InputField } from "../../../components";

const EditAddressForm = ({
  onSubmit,
  country,
  state,
  city,
  street,
  register,
  errors,
}) => {
  return (
    <form className="space-y-1" onSubmit={onSubmit}>
      <InputField
        name="country"
        placeholder="Country"
        initialValue={country}
        register={register}
        error={errors.country}
        pt={{
          root: "px-2 py-2 rounded border-neutral-400",
          input:
            "text-xs text-black placeholder:text-neutral-500 bg-transparent",
        }}
      />
      <InputField
        name="state"
        placeholder="State or Governorate"
        initialValue={state}
        register={register}
        error={errors.state}
        pt={{
          root: "px-2 py-2 rounded border-neutral-400",
          input:
            "text-xs text-black placeholder:text-neutral-500 bg-transparent",
        }}
      />
      <InputField
        name="city"
        placeholder="City"
        initialValue={city}
        register={register}
        error={errors.city}
        pt={{
          root: "px-2 py-2 rounded border-neutral-400",
          input:
            "text-xs text-black placeholder:text-neutral-500 bg-transparent",
        }}
      />
      <InputField
        name="street"
        placeholder="Street"
        initialValue={street}
        register={register}
        error={errors.street}
        pt={{
          root: "px-2 py-2 rounded border-neutral-400",
          input:
            "text-xs text-black placeholder:text-neutral-500 bg-transparent",
        }}
      />
    </form>
  );
};

export default EditAddressForm;
