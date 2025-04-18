import { Button } from "primereact/button";
import { useCreateCategoryMutation } from "../categoriesApiSlice";
import { InputField } from "../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../validations/categorySchema";

const CategoryAddForm = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = async (data) => {
    try {
      await createCategory(data).unwrap();
      reset();
    } catch (err) {
      console.error("Failed to create category:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-4 bg-white rounded-lg shadow-sm"
    >
      <div className="flex flex-col gap-4">
        <InputField
          label="Name"
          name="name"
          placeholder="Enter category name"
          register={register}
          error={errors.name}
          pt={{
            outerRoot: "space-y-2",
            label: "font-medium",
          }}
        />

        <Button
          label="Create Category"
          type="submit"
          severity="success"
          pt={{
            root: "w-full bg-[#3BB77E] hover:bg-[#2a9d68] py-2",
            label: "text-white font-medium",
          }}
          disabled={!isDirty || isLoading}
        />
      </div>
    </form>
  );
};

export default CategoryAddForm;
