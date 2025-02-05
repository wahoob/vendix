import { Rating } from "primereact/rating";
import dayjs from "dayjs";

import { person } from "../../../assets/images";

import { getTimeToNow } from "../../../utils/functions.utils";

const ReviewCard = ({
  image,
  fullName,
  createdDate,
  updatedDate,
  comment,
  rating,
}) => {
  const { firstName, lastName } = fullName;
  const createdRelativeTime = getTimeToNow(createdDate);
  const updatedRelativeTime = getTimeToNow(updatedDate);
  const isUpdated = !dayjs(createdDate).isSame(updatedDate);

  return (
    <div className="space-y-2 border-b pb-6">
      <div className="flex sm:items-center max-sm:flex-col justify-between gap-x-4 gap-y-1">
        <div className="row gap-2">
          <div className="size-8 rounded-full overflow-hidden shrink-0">
            <img src={person} alt="person" className="size-full object-cover" />
          </div>

          <div className="row flex-wrap gap-x-2">
            <p className="font-bold text-sm">
              {firstName} {lastName}
            </p>

            <div className="row">
              <span className="text-[11px] text-[#7E7E7E] font-medium">
                {createdRelativeTime}
              </span>
              {isUpdated && (
                <span className="text-[11px] text-[#7E7E7E] font-medium italic">
                  (edited {updatedRelativeTime})
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="row gap-3">
          <span className="font-bold text-sm">{rating.toFixed(1)}</span>
          <Rating
            value={rating}
            readOnly
            cancel={false}
            pt={{
              root: { className: "gap-0.5" },
              item: { className: "size-4" },
              onIcon: { className: "text-[#3BB77E]" },
              offIcon: { className: "text-[#3BB77E]" },
            }}
          />
        </div>
      </div>

      <p className="text-sm">{comment}</p>
    </div>
  );
};

export default ReviewCard;
