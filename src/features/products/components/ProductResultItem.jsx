import { classNames } from "primereact/utils";

const ProductResultItem = ({ item, onClick }) => {
  return (
    <li
      key={item.id}
      className={classNames(
        "row justify-between",
        "px-4 py-2",
        "cursor-pointer hover:bg-[#F3F4F6]"
      )}
      onClick={onClick}
    >
      <div className="row gap-2">
        <i className={classNames("pi pi-search", "text-xs text-[#8A8A8A]")}></i>
        <p className="line-clamp-1">{item.name}</p>
      </div>

      <p className={classNames("font-bold text-[#1f3341]", "max-sm:hidden")}>
        ${item.price}
      </p>
    </li>
  );
};

export default ProductResultItem;
