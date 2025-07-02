import { classNames } from "primereact/utils";

const SubscribeBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className={classNames(
        "flex flex-col sm:flex-row gap-2 sm:gap-4",
        "w-full sm:w-fit md:mt-20 mt-10",
        "sm:bg-white sm:rounded-full sm:overflow-hidden",
      )}
      onSubmit={handleSubmit}
    >
      <div
        className={classNames(
          "flex items-center bg-white rounded-lg sm:rounded-none",
          "border border-gray-200 sm:border-none",
          "w-full sm:w-auto",
        )}
      >
        <i
          className={classNames(
            "pi pi-send",
            "text-[#7E7E7E] ml-4 sm:ml-6",
            "hidden sm:block",
          )}
        ></i>

        <input
          type="email"
          placeholder="Your email address"
          className={classNames(
            "w-full sm:w-60",
            "placeholder:text-[#838383] placeholder:text-sm sm:placeholder:text-base",
            "outline-none py-3 sm:py-[22px] px-4",
            "rounded-lg sm:rounded-none",
          )}
          required
        />
      </div>

      <button
        type="submit"
        className={classNames(
          "text-white font-quicksand font-medium",
          "bg-[#3BB77E] py-3 sm:py-[22px] px-6 sm:px-10",
          "rounded-lg sm:rounded-full",
          "w-full sm:w-auto",
          "hover:bg-[#2da56e] transition-colors duration-200",
        )}
      >
        Subscribe
      </button>
    </form>
  );
};

export default SubscribeBox;
