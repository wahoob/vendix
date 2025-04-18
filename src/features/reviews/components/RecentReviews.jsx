import { Timeline } from "primereact/timeline";

import { AsyncContentWrapper } from "../../../components";

import { useGetAllReviewsQuery } from "../reviewsApiSlice";
import useRecentReviews from "../hooks/useRecentReviews";

const RecentReviews = () => {
  const { isError, isFetching, isLoading, isSuccess, error, data } =
    useGetAllReviewsQuery({ sort: "-updatedAt", limit: 5 });

  const recentReviews = useRecentReviews(data?.reviews || []);

  const customizedContent = (item) => (
    <div className="row gap-4">
      <h4 className="font-semibold text-[15px] text-[#6C757D] whitespace-nowrap">
        {item.date}
      </h4>

      <div className="row -space-x-2.5">
        <div className="w-6 h-0.5 bg-[#3BB77E]" />
        <i className="pi pi-angle-right text-[#3BB77E]" />
      </div>

      <p className="text-[13px] text-[#4F5D77] line-clamp-2">{item.text}</p>
    </div>
  );

  return (
    <AsyncContentWrapper
      error={error}
      isError={isError}
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
      render={() => (
        <Timeline
          value={recentReviews}
          align="left"
          content={customizedContent}
          marker={<i className="pi pi-play-circle text-[#6C757D]" />}
          pt={{
            opposite: "hidden",
            event: "min-h-12",
          }}
        />
      )}
    />
  );
};

export default RecentReviews;
