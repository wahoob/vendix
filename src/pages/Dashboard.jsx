import { classNames } from "primereact/utils";

import { LatestOrders } from "../features/orders";
import { NewMembers } from "../features/users";
import {
  TopSellingCategories,
  RevenueStatusChart,
  SaleStatisticsChart,
  StatsPanel,
} from "../features/products";
import { RecentReviews } from "../features/reviews";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-1">Dashboard</h1>
        <p className="font-medium text-[#4F5D77]">
          Whole data about your business here
        </p>
      </div>

      <StatsPanel />

      <div
        className={classNames(
          "sm:grid grid-cols-2 md:grid-cols-12 md:grid-rows-[repeat(12,min-content)]",
          "max-md:space-y-3 gap-3 lg:gap-6",
          "[&>div]:card"
        )}
      >
        <div
          className={classNames(
            "flex flex-col h-full",
            "md:col-span-7 md:row-span-8 col-span-2"
          )}
        >
          <h3 className="font-bold text-lg">Sale statistics</h3>

          <SaleStatisticsChart />
        </div>

        <div
          className={classNames(
            "flex flex-col h-full",
            "md:col-start-8 md:-col-end-1 md:row-span-6",
            "col-span-2"
          )}
        >
          <h3 className="font-bold text-lg flex-1 xl:flex-[0.7]">
            Revenue Base on Status
          </h3>

          <RevenueStatusChart />
        </div>

        <div
          className={classNames(
            "xl:col-span-3 xl:row-span-4",
            "md:col-span-5 md:row-span-6"
          )}
        >
          <h3 className="font-bold text-lg">New Members</h3>

          <NewMembers />
        </div>

        <div
          className={classNames(
            "xl:col-start-4 md:col-end-8 md:row-span-4",
            "md:col-start-1"
          )}
        >
          <h3 className="font-bold text-lg">Recent reviews</h3>

          <RecentReviews />
        </div>

        <div
          className={classNames(
            "xl:col-start-8 xl:-col-end-1 xl:row-start-7 xl:-row-end-1",
            "md:col-span-full md:-row-start-1",
            "col-span-2"
          )}
        >
          <h3 className="font-bold text-lg">Top Selling Categories</h3>

          <TopSellingCategories />
        </div>
      </div>

      <div className="md:col-span-7 md:row-span-8 col-span-2 card">
        <h3 className="font-bold text-lg">Latest orders</h3>

        <LatestOrders />
      </div>
    </div>
  );
};

export default Dashboard;
