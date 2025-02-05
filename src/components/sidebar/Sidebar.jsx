import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";

import FilterList from "./FilterList";
import NavigationList from "./NavigationList";
import { Overlay } from "../../components";
import { CategorySidebarList } from "../../features/categories";

import { selectSidebar, toggleSidebar } from "../../features/sidebar";

const Sidebar = () => {
  const { isOpen } = useSelector(selectSidebar);

  const dispatch = useDispatch();
  const toggle = () => dispatch(toggleSidebar());

  return (
    <>
      <Overlay isOpen={isOpen} toggle={toggle} />

      <aside>
        {/*  */}
        <div
          className={classNames(
            "max-lg:absolute left-0 top-0 z-50 transition-all ease-linear duration-300",
            "overflow-x-hidden bg-white h-full",
            isOpen
              ? "w-80 mr-5 translate-x-0"
              : "max-lg:-translate-x-full lg:w-0"
          )}
        >
          <div
            className={classNames(
              "sticky top-0 z-40 bg-white",
              "flex py-3 lg:hidden"
            )}
          >
            <Button icon="pi pi-times" severity="success" onClick={toggle} />
          </div>

          {/*  */}
          <div
            className={classNames(
              "flex overflow-x-hidden w-full",
              "max-lg:pb-5 px-1"
            )}
          >
            {/*  */}
            <div className="flex flex-col gap-6 w-full">
              <div className="md:hidden">
                <NavigationList />
              </div>

              <CategorySidebarList />

              <FilterList />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
