import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";

import { AsyncContentWrapper } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { hideSearchResults, selectProductsUI } from "../productSlice";

const ProductResultsPanel = ({
  isFetching,
  isLoading,
  isSuccess,
  isError,
  error,
  searchResult,
}) => {
  const { showSearch } = useSelector(selectProductsUI);
  const dispatch = useDispatch();

  const hide = () => dispatch(hideSearchResults());
  const navigate = useNavigate();

  const handleClick = (slug) => {
    navigate(`/shop/${slug}`);
    hide();
  };

  const renderResults = () => {
    if (searchResult.length > 0) {
      return (
        <ul className="text-black w-full">
          {searchResult.map((item) => (
            <li
              key={item.id}
              className={classNames(
                "row justify-between",
                "px-4 py-2",
                "cursor-pointer hover:bg-[#F3F4F6]"
              )}
              onClick={() => handleClick(item.slug)}
            >
              <div className="row gap-2">
                <i
                  className={classNames(
                    "pi pi-search",
                    "text-xs text-[#8A8A8A]"
                  )}
                ></i>
                <p className="line-clamp-1">{item.name}</p>
              </div>

              <p
                className={classNames(
                  "font-bold text-[#1f3341]",
                  "max-sm:hidden"
                )}
              >
                ${item.price}
              </p>
            </li>
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
