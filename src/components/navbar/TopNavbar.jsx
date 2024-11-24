import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Link } from "react-router-dom";
import { useState } from "react";

import VerticalDivider from "../ui/VerticalDivider";

const TopNavbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  return (
    <header
      className={classNames(
        "text-[11px] sm:text-[13px] text-[#7E7E7E] font-medium",
        "border-b border-[#ECECEC]",
        "py-[10px]"
      )}
    >
      <div
        className={classNames(
          "container",
          "row max-lg:flex-wrap gap-x-10 gap-y-2"
        )}
      >
        <ul
          className={classNames(
            "row flex-wrap gap-x-2.5 gap-y-1",
            "mx-auto",
            "hover:[&>li]:text-[#545454]"
          )}
        >
          <li>
            <Link to="/">About Us</Link>
          </li>
          <VerticalDivider />
          <li>
            <Link to="/">My Account</Link>
          </li>
          <VerticalDivider />
          <li>
            <Link to="/">Wishlist</Link>
          </li>
          <VerticalDivider />
          <li>
            <Link to="/">Order Tracking</Link>
          </li>
        </ul>
        <p
          className={classNames(
            "flex-1",
            "text-[12px] sm:text-sm text-center font-semibold",
            "max-lg:hidden"
          )}
        >
          100% Secure delivery without contacting the courier
        </p>
        <div
          className={classNames("row flex-wrap gap-x-2.5 gap-y-1", "mx-auto")}
        >
          <p>
            Need help? Call Us:
            <span className="text-[#3BB77E] font-semibold">+ 1800 900</span>
          </p>

          <VerticalDivider />

          <Dropdown
            placeholder={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.value)}
            options={["English", "Arabic"]}
            pt={{
              root: { className: "gap-0.5" },
              input: {
                className:
                  "text-[#7E7E7E] group-hover:text-[#545454] text-[13px] font-medium",
              },
              trigger: { className: "size-[7px]" },
              item: { className: "text-[13px] font-medium" },
            }}
          />

          <VerticalDivider />

          <Dropdown
            placeholder={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.value)}
            options={["USD", "EGY"]}
            pt={{
              root: { className: "gap-0.5" },
              input: {
                className:
                  "text-[#7E7E7E] group-hover:text-[#545454] text-[13px] font-medium",
              },
              trigger: { className: "size-[7px]" },
              item: { className: "text-[13px] font-medium" },
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
