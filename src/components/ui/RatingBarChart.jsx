import { ProgressBar } from "primereact/progressbar";
import useStarData from "../../hooks/useStarData";
import { Fragment } from "react";

const RatingBarChart = ({ reviews }) => {
  const starData = useStarData(reviews);

  return (
    <div className="grid grid-cols-[1fr,auto] gap-x-6 gap-y-2 sm:gap-y-4 items-center">
      {starData.map(({ star, count, percentage }, index) => (
        <Fragment key={index}>
          <ProgressBar
            value={percentage}
            showValue={false}
            pt={{
              root: { className: "h-3" },
              value: { className: "bg-[#3BB77E]" },
            }}
          />
          <p className="text-xs font-bold">
            {star}{" "}
            <span className="font-semibold text-[#7E7E7E] ml-2 font-quicksand">
              {count} reviews
            </span>
          </p>
        </Fragment>
      ))}
    </div>
  );
};

export default RatingBarChart;
