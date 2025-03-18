import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

import person from "../../../assets/images/person.jpg";

import {
  AsyncContentWrapper,
  Rating,
  SocialMediaLinks,
} from "../../../components";

import { useGetVendorQuery } from "../vendorsApiSlice";

const VendorOverview = ({ _id: id }) => {
  const { isLoading, isError, isFetching, isSuccess, error, data } =
    useGetVendorQuery({ id });

  const content = () => {
    const {
      rating,
      socialMediaLinks,
      businessName,
      businessDescription,
      businessAddress,
    } = data;
    const { country, city, state, street } = businessAddress;

    return (
      <div className="space-y-6">
        <div className="w-full h-36 bg-[#FEC040] rounded-t-md max-md:hidden" />

        <div>
          <div
            className={classNames(
              "flex items-start justify-between gap-8 flex-wrap",
              "border-b-2 pb-8",
            )}
          >
            <div className="relative flex flex-wrap gap-4">
              <div
                className={classNames(
                  "size-44 min-w-44 rounded-[5px] overflow-hidden shadow-shadow6",
                  "md:absolute -bottom-2 left-4 mx-auto",
                )}
              >
                <img
                  src={person}
                  alt="picture"
                  className="object-cover size-full"
                />
              </div>

              <div className="md:pl-52">
                <h3 className="text-2xl font-bold font-quicksand capitalize">
                  {businessName}
                </h3>
                <p className="text-[13px] text-[#7E7E7E] font-medium">
                  {businessDescription}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 [&>*]:w-36 [&>*]:mx-auto">
              <Button
                severity="contrast"
                label="Actions"
                icon="pi pi-angle-down"
                iconPos="right"
                pt={{
                  root: {
                    className: "bg-[#F4F5F9] px-4 py-2.5 rounded-[5px]",
                  },
                  label: {
                    className: "text-black text-xs font-normal",
                  },
                }}
              />
              <Button
                severity="success"
                label="View Profile"
                pt={{
                  root: {
                    className:
                      "bg-[#3BB77E] hover:bg-[#319969] px-4 py-2.5 rounded-[5px]",
                  },
                  label: {
                    className: "text-white text-xs font-normal",
                  },
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-20 py-5">
            <div className="rounded-md space-y-1">
              <p className="text-sm font-quicksand font-bold">Rating:</p>
              <Rating
                rating={rating}
                pt={{
                  item: "size-3.5",
                  onIcon: "text-[#3BB77E]",
                  offIcon: "text-[#3BB77E]",
                }}
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-quicksand font-bold">Social Media</p>
              <SocialMediaLinks {...socialMediaLinks} />
            </div>

            <div>
              <p className="text-sm font-quicksand font-bold">Address</p>
              <ul className="text-[13px] font-medium text-[#7E7E7E]">
                <li>Country: {country}</li>
                <li>State: {state}</li>
                <li>City: {city}</li>
                <li>Street: {street}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AsyncContentWrapper
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
      render={content}
    />
  );
};

export default VendorOverview;
