import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";

import { AsyncContentWrapper } from "../../../components";
import ProductResultItem from "./ProductResultItem";

const ProductResultsPanel = ({
  isFetching,
  isLoading,
  isSuccess,
  isError,
  error,
  searchResult,
  showSearch,
}) => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/");

  const renderResults = () => {
    if (searchResult.length > 0) {
      return (
        <ul className="text-black w-full">
          {searchResult.map((item) => (
            <ProductResultItem
              key={item.id}
              item={item}
              onClick={handleClick}
            />
          ))}
        </ul>
      );
    } else {
      return <p className="font-bold">No content</p>;
    }
  };

  return (
    <div
      className={classNames(
        "absolute top-[110%] left-1/2 -translate-x-1/2 z-40",
        "font-quicksand font-semibold text-sm text-[#253D4E] capitalize",
        "bg-white shadow-shadow2",
        "py-2 w-full rounded-lg",
        showSearch ? "row justify-center" : "hidden"
      )}
      onMouseDown={(e) => e.preventDefault()}
    >
      <AsyncContentWrapper
        isSuccess={isSuccess}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        render={renderResults}
      />
    </div>
  );
};

export default ProductResultsPanel;
