import { classNames } from "primereact/utils";

const SubscribeBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className={classNames(
        "row max-sm:flex-col gap-y-2 gap-x-4",
        "w-full sm:w-fit md:mt-20 mt-10",
        "sm:bg-white sm:rounded-full overflow-hidden"
      )}
      onSubmit={handleSubmit}
    >
      <div className="row bg-white w-full">
        <i
          className={classNames(
            "pi pi-send",
            "text-[#7E7E7E] ml-6",
            "max-sm:hidden"
          )}
        ></i>

        <input
          type="email"
          placeholder="Your email address"
          className={classNames(
            "sm:min-w-60",
            "placeholder:text-[#838383] max-sm:placeholder:text-sm",
            "outline-none py-4 sm:py-[22px] px-4 w-full"
          )}
        />
      </div>

      <button
        type="submit"
        className={classNames(
          "text-white font-quicksand font-medium",
          "bg-[#3BB77E] py-[22px] px-10 sm:rounded-full",
          "max-sm:w-full"
        )}
      >
        Subscribe
      </button>
    </form>
  );
};

export default SubscribeBox;
