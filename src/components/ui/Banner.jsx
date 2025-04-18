import { classNames } from "primereact/utils";

import { SubscribeBox } from "../";

import { paperFlight, postMan } from "../../assets/images";

const Banner = () => {
  return (
    <div className="container">
      <div
        className={classNames(
          "bg-footer-tabpanel",
          "px-9 py-12 sm:px-[4.875rem] sm:py-[5.25rem]",
          "rounded-[20px] relative",
          "flex flex-col items-center",
        )}
      >
        <div className="space-y-4 text-center relative z-20">
          <h3 className="font-quicksand font-bold text-2xl sm:text-4xl text-[#253D4E]">
            Stay home & get your needs from our shop
          </h3>
          <p className="text-sm sm:text-lg text-[#7E7E7E]">
            Start Your Shopping with{" "}
            <span className="text-[#3BB77E]">Vendix</span>
          </p>
        </div>

        <div className="mx-auto w-fit relative">
          <SubscribeBox />

          <div className="absolute -top-2 left-10">
            <img src={paperFlight} alt="paper flight figure" />
          </div>
        </div>

        <div className="absolute -top-4 right-[4.875rem]">
          <img src={postMan} alt="post man figure" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
