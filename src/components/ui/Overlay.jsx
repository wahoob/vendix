import { classNames } from "primereact/utils";

const Overlay = ({ isOpen, toggle }) => {
  return (
    <div
      className={classNames(
        "transition-all lg:hidden",
        isOpen ? "fixed inset-0 bg-black bg-opacity-50 z-50 size-full" : ""
      )}
      onClick={toggle}
    />
  );
};

export default Overlay;
