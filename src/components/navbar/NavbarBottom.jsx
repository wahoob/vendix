import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Browse, Deals, Headphone } from "../../utils/icons.utils";
import { useDispatch } from "react-redux";

import { toggleSidebar } from "../../features/sidebar/sidebarSlice";
import { useNavigate } from "react-router-dom";

const NavbarBottom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggle = () => dispatch(toggleSidebar());

  return (
    <div className="py-3 border-y border-[#ECECEC]">
      <div className={classNames("container", "row justify-between gap-4")}>
        <div
          className={classNames(
            "row gap-4 lg:gap-6 max-md:justify-center",
            "text-[#253D4E] text-sm font-bold font-quicksand"
          )}
        >
          <Button
            label="Browse With Filters"
            icon={
              <div className="size-[17px] text-white">
                <Browse />
              </div>
            }
            pt={{
              root: {
                className: classNames(
                  "py-3 px-5 mx-auto",
                  "bg-[#3BB77E] hover:bg-[#319969]",
                  "gap-2 shrink-0 max-md:hidden"
                ),
              },
              label: { className: "text-white" },
            }}
            severity="success"
            onClick={toggle}
          />

          <div
            className={classNames(
              "row gap-4 lg:gap-6",
              "hover:[&>*]:text-[#3BB77E]"
            )}
          >
            <Button
              label="Deals"
              icon={<Deals />}
              pt={{
                root: { className: "gap-1" },
              }}
              severity="success"
            />
            <Button label="Home" severity="success" />
            <Button label="About" severity="success" />
            <Button
              label="Shop"
              severity="success"
              onClick={() => navigate("/shop")}
            />
            <Button label="Vendors" severity="success" />
            <Button label="Contact" severity="success" />
          </div>
        </div>

        <div className="row gap-2 shrink-0">
          <div className="w-[37px] h-[31px] text-[#253D4E]">
            <Headphone />
          </div>

          <div className="row flex-col">
            <h3 className="font-quicksand text-[#3BB77E] font-bold leading-[26px] text-2xl">
              1900 - 888
            </h3>
            <p className="text-xs font-medium text-[#7E7E7E] leading-3">
              24/7 Support Center
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarBottom;
