import { useState } from "react";
import {
  CategoriesList,
  CategoryAddForm,
  CategoryEditForm,
} from "../features/categories";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const showUpdatePrompt = (data) => {
    setSelectedCategory(data);
  };
  const hideUpdatePrompt = () => setSelectedCategory(null);

  return (
    <>
      {!!selectedCategory && (
        <CategoryEditForm
          visible={!!selectedCategory}
          category={selectedCategory}
          onHide={hideUpdatePrompt}
        />
      )}

      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold mb-1">Categories</h1>
          <p className="font-medium text-[#4F5D77]">
            Add, edit or delete a category
          </p>
        </div>

        <div className="card flex max-lg:flex-col">
          <div className="lg:min-w-72 xl:min-w-80 max-lg:w-full">
            <CategoryAddForm />
          </div>

          <div className="flex-1 overflow-x-auto">
            <CategoriesList show={showUpdatePrompt} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
