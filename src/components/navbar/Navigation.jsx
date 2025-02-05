import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Compare, Cart, Person, Heart, Map } from "../../utils/icons.utils";
import { logo } from "../../assets/images";

import { TagButton, IconicDropdown } from "../";
import { ProductLookup } from "../../features/products";

import { toggleSidebar } from "../../features/sidebar";
import { useGetCartQuery } from "../../features/cart";
import { useGetWishlistQuery } from "../../features/wishlist";
import { useAuth } from "../../features/auth";

const Navigation = () => {
  const [selectedLocation, setSelectedLocation] = useState(1);
  const { data: cart } = useGetCartQuery();
  const { data: wishlist } = useGetWishlistQuery();
  const { isLoggedIn, username } = useAuth();

  const [showFullWidth, setShowFullWidth] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => dispatch(toggleSidebar());

  return (
    <div
      className={classNames(
        "container py-5",
        "row justify-between sm:gap-4 md:gap-9 2xl:gap-[4.4rem]"
      )}
    >
      <div
        className={classNames("md:hidden shrink-0", showFullWidth && "hidden")}
      >
        <Button
          icon="pi pi-bars"
          pt={{ icon: { className: "text-2xl" } }}
          severity="success"
          onClick={toggle}
        />
      </div>

      {!showFullWidth && (
        <Link to="/" className="sm:max-w-44">
          <img src={logo} alt="logo" className="max-w-36" />
        </Link>
      )}

      <div
        className={classNames(
          "row sm:gap-4 md:gap-6 2xl:gap-12",
          showFullWidth ? "flex-1" : "md:flex-1"
        )}
      >
        <div
          className={classNames(
            "flex-1 row",
            !showFullWidth && "max-md:hidden"
          )}
        >
          <ProductLookup
            showFullWidth={showFullWidth}
            setShowFullWidth={setShowFullWidth}
          />
        </div>

        <div className={classNames(showFullWidth ? "hidden" : "row gap-8")}>
          <IconicDropdown
            selectedOption={selectedLocation}
            onChange={(e) => setSelectedLocation(e.value)}
            Icon={Map}
            options={[
              { label: "Your Location", value: 1 },
              { label: "Your Location", value: 2 },
            ]}
            pt={{
              root: {
                className: classNames(
                  "gap-2 max-xl:hidden",
                  "px-[14px] py-[10px]",
                  "border border-[#ECECEC] border-solid shadow-shadow1"
                ),
              },
              trigger: {
                className: "size-2",
              },
              item: { className: "text-sm font-quicksand font-medium" },
            }}
            partClassNames={{
              root: classNames(
                "flex gap-2.5",
                "text-sm font-quicksand font-medium"
              ),
              icon: "text-[#B6B6B6] w-[13px] h-[15px]",
              text: "text-[#3BB77E] group-hover:text-[#319969]",
            }}
          />

          <ul className="row gap-2.5">
            <li className="md:hidden row">
              <Button
                icon="pi pi-search"
                pt={{ icon: { className: "text-xl" } }}
                severity="success"
                onClick={() => setShowFullWidth(true)}
              />
              <Divider className="h-6 bg-[#CACACA]" />
            </li>

            <li className="max-sm:hidden">
              <TagButton Icon={Compare} badge={3} text={"Compare"} to={"/"} />
            </li>

            <li className="max-sm:hidden">
              <TagButton
                Icon={Heart}
                badge={wishlist?.products.length || 0}
                text={"Wishlist"}
                to={"/wishlist"}
              />
            </li>

            <li>
              <TagButton
                Icon={Cart}
                badge={cart?.totalProducts || 0}
                text={"Cart"}
                to={"/cart"}
              />
            </li>

            <li className="max-sm:hidden">
              <TagButton
                Icon={Person}
                text={username}
                to={isLoggedIn ? "/dashboard" : "/auth/login"}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
