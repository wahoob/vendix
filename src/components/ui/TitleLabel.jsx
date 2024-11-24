import { classNames } from "primereact/utils";

const TitleLabel = ({ title }) => {
  return (
    <div
      className={classNames(
        "pt-[31px] pb-5 px-[31px]",
        "border-b border-[#ECECEC] bg-white",
        "sticky top-0 z-30"
      )}
    >
      <h3 className="text-2xl font-bold font-quicksand text-[#253D4E]">
        {title}
      </h3>

      <div
        className={classNames(
          "text-[#BCE3C9] bg-[#BCE3C9]",
          "h-0.5 w-2/5",
          "absolute bottom-0"
        )}
      />
    </div>
  );
};

export default TitleLabel;
