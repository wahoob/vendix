import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Chips } from "primereact/chips";
import { ToggleButton } from "primereact/togglebutton";
import { classNames } from "primereact/utils";
import { useState, useRef } from "react";
import { Image } from "primereact/image";
import { FileUpload } from "primereact/fileupload";

import { placeholderImage } from "../../../assets/images";

import { InputField } from "../../../components";
import { CategoryDropdown } from "../../categories";

import { getChangedFields } from "../../../utils/functions.utils";

import productSchema from "../validations/productSchema";

const pt = {
  outerRoot: "space-y-2",
  label: "font-medium text-gray-700 line-clamp-1",
  root: "hover:border-[#3BB77E] focus-within:border-[#3BB77E] bg-[#F8F9FA]",
  input: "sm:text-base font-medium bg-transparent",
};

const ProductForm = ({ product, onSubmit, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    product?.category || null,
  );
  const fileUploadRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      stockQuantity: product?.stockQuantity || "",
      brand: product?.brand || "",
      shippingInformation: product?.shippingInformation || "",
      warrantyInformation: product?.warrantyInformation || "",
      category: product?.category?._id || "",
      tags: product?.tags || [],
      isArchived: product?.isArchived || false,
      images: product?.images || [],
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      const changedFields = getChangedFields({ dirtyFields, data });
      await onSubmit(changedFields);
      onClose?.();
    } catch (error) {
      console.error("Failed to submit product:", error);
    }
  };

  const handleImageUpload = (e) => {
    const files = e.files;
    const currentImages = watch("images") || [];
    const updatedImages = [...currentImages, ...files];

    setValue("images", updatedImages, {
      shouldDirty: true,
    });
    fileUploadRef.current.clear();
  };

  const removeImage = (index) => {
    const currentImages = watch("images") || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);

    setValue("images", updatedImages, { shouldDirty: true });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 rounded-lg overflow-y-auto"
    >
      <ToggleButton
        checked={watch("isArchived")}
        onChange={(e) => setValue("isArchived", e.value, { shouldDirty: true })}
        onLabel="Archived"
        offLabel="Not Archived"
        pt={{
          root: "absolute top-0 right-0",
          box: ({ props }) =>
            classNames("py-1", {
              "bg-[#3BB77E]": props.checked,
            }),
        }}
      />

      <InputField
        label="Product Name"
        placeholder="Type here"
        name="name"
        register={register}
        error={errors.name}
        pt={pt}
      />

      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Description</label>
        <textarea
          {...register("description")}
          className={classNames(
            "min-h-28 p-3 rounded-lg font-medium bg-[#F8F9FA]",
            "border hover:border-[#3BB77E] focus:border-[#3BB77E] outline-none",
            errors.description ? "border-red-400" : "border-gray-300",
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Price"
          placeholder="Type here"
          name="price"
          type="number"
          decimal
          register={register}
          error={errors.price}
          pt={pt}
        />

        <InputField
          label="Stock Quantity"
          placeholder="Type here"
          name="stockQuantity"
          type="number"
          register={register}
          error={errors.stockQuantity}
          pt={pt}
        />
      </div>
      <InputField
        label="Brand"
        placeholder="Type here"
        name="brand"
        register={register}
        error={errors.brand}
        pt={pt}
      />
      <InputField
        label="Shipping Information"
        placeholder="Type here"
        name="shippingInformation"
        register={register}
        error={errors.shippingInformation}
        pt={pt}
      />
      <InputField
        label="Warranty Information"
        placeholder="Type here"
        name="warrantyInformation"
        register={register}
        error={errors.warrantyInformation}
        pt={pt}
      />
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Tags</label>
        <Chips
          value={watch("tags")}
          onChange={(e) => setValue("tags", e.value, { shouldDirty: true })}
          className="w-full"
          placeholder="Type here"
          pt={{
            container: "shadow-none gap-y-2 bg-[#F8F9FA]",
            root: classNames(
              "shadow-none border py-1.5 rounded-lg bg-[#F8F9FA]",
              {
                "px-2 border-transparent focus-within:border-[#E0E2E9]":
                  watch("tags"),
                "px-5 border-[#E0E2E9]": !watch("tags").length,
                "max-md:border-[#E0E2E9]": watch("tags").length,
              },
            ),
            label: "max-md:text-[13px]",
          }}
        />
      </div>
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Category</label>
        <CategoryDropdown
          selectedCategory={selectedCategory}
          setSelectedCategory={(category) => {
            setSelectedCategory(category);
            setValue("category", category._id, { shouldDirty: true });
          }}
          pt={{
            root: "px-4 py-[11px] border border-gray-300 rounded-lg w-full sm:w-64 bg-[#F8F9FA]",
            input: "text-sm sm:text-[15px] font-medium",
            trigger: "size-3",
          }}
        />
      </div>

      <div className="space-y-4">
        <label className="font-medium text-gray-700">Product Images</label>

        {/* Display all images */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-4">
            {(watch("images") || []).length > 0 ? (
              (watch("images") || []).map((image, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt={`Product image ${index + 1}`}
                    width="100"
                    height="100"
                    imageClassName="object-cover rounded-lg border border-gray-200"
                    preview
                  />
                  <Button
                    icon="pi pi-times"
                    className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                    severity="danger"
                  />
                </div>
              ))
            ) : (
              <div className="relative group">
                <Image
                  src={placeholderImage}
                  alt="No image available"
                  imageClassName="object-cover px-4 rounded-lg max-h-24"
                />
              </div>
            )}
          </div>
        </div>

        {/* File upload component */}
        <FileUpload
          ref={fileUploadRef}
          name="images"
          multiple
          accept="image/*"
          maxFileSize={1000000}
          emptyTemplate={
            <p className="m-0 max-md:hidden">
              Drag and drop images here to upload.
            </p>
          }
          onSelect={handleImageUpload}
          customUpload
          pt={{
            content: "p-0",
            chooseButton: "md:hidden bg-[#3BB77E]",
            buttonbar: "bg-transparent p-0",
          }}
          uploadOptions={{ className: "hidden" }}
          cancelOptions={{ className: "hidden" }}
          className="border border-dashed border-gray-300 rounded-lg p-4 hover:border-[#3BB77E] transition-colors"
        />
        <small className="text-gray-500">
          Images will be uploaded when you click &quot;Save Changes&quot;
        </small>
      </div>

      <div className="flex justify-end gap-6 mt-4 mb-2 mr-2">
        <Button
          label="Cancel"
          type="button"
          severity="contrast"
          className="hover:text-neutral-400"
          onClick={onClose}
        />
        <Button
          label="Save Changes"
          severity="success"
          type="submit"
          disabled={!isDirty}
          pt={{
            root: "bg-[#3BB77E] hover:bg-[#2ea56d] px-4 py-2",
            label: "text-white",
          }}
        />
      </div>
    </form>
  );
};

export default ProductForm;
