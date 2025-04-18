import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useUpdateCategoryMutation } from "../categoriesApiSlice";
import { InputField } from "../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../validations/categorySchema";
import { getChangedFields } from "../../../utils/functions.utils";

const CategoryEditForm = ({ category, visible, onHide }) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const {
    register,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: category.name || "",
    },
  });

  const onSubmit = async (data) => {
    const changedFields = getChangedFields({ dirtyFields, data });
    if (Object.keys(changedFields).length) {
      onHide();
      return;
    }

    try {
      await updateCategory({ id: category.id, ...changedFields }).unwrap();
      onHide();
    } catch (err) {
      console.error("Failed to update category:", err);
    }
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      draggable={false}
      pt={{
        root: { className: "max-w-xl w-full" },
        header: { className: "py-2" },
        closeButton: { className: "focus:shadow-[0_0_0_0.2rem_#88EAAC]" },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="flex flex-col gap-4">
          <InputField
            label="Name"
            name="name"
            placeholder="Enter category name"
            register={register}
            error={errors.name}
            pt={{
              outerRoot: "space-y-2",
            }}
          />

          <Button
            label="Update Category"
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
    </Dialog>
  );
};

export default CategoryEditForm;
