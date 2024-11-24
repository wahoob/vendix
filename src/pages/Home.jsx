import { useState } from "react";

import { Sidebar, SlideShow, Banner } from "../components";

import CategoryNavigationBar from "../features/categories/components/CategoryNavigationBar";
import PopularProducts from "../features/products/components/PopularProducts";
import DealsProducts from "../features/products/components/DealsProducts";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="space-y-14 py-8">
      <div className="flex container">
        <Sidebar />
        <div className="overflow-hidden space-y-12 flex-1">
          <SlideShow />

          <div className="space-y-11">
            <div className="flex lg:items-center max-lg:flex-col justify-between gap-5 font-quicksand">
              <h3 className="text-3xl font-bold text-[#253D4E] whitespace-nowrap">
                Popular Products
              </h3>

              <div className="lg:w-7/12 w-full">
                <CategoryNavigationBar
                  selected={selectedCategory}
                  onChange={setSelectedCategory}
                />
              </div>
            </div>

            <div>
              <PopularProducts selectedCategory={selectedCategory} />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-14">
        <DealsProducts />
        <Banner />
      </div>
    </div>
  );
};

export default Home;
