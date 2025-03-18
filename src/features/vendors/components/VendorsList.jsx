import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { Tooltip } from "primereact/tooltip";
import { classNames } from "primereact/utils";

import { person } from "../../../assets/images";

import { Rating, SocialMediaLinks } from "../../../components";

import {
  useDeleteVendorMutation,
  useGetVendorsQuery,
} from "../vendorsApiSlice";

const VendorsList = ({ show }) => {
  const menuRef = useRef(null);

  const [vendor, setVendor] = useState(null);
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading } = useGetVendorsQuery({ page });
  const [deleteVendor] = useDeleteVendorMutation();

  const updateVendorData = () => {
    show(vendor);
  };
  const removeVendor = async () => {
    await deleteVendor({ id: vendor.id }).unwrap();
  };

  const items = [
    {
      label: "Options",
      items: [
        {
          label: "Update",
          icon: "pi pi-user-edit",
          command: updateVendorData,
        },
        {
          label: "Delete",
          icon: "pi pi-trash",
          command: removeVendor,
        },
      ],
    },
  ];

  return (
    <DataTable
      value={data?.vendors}
      paginator
      lazy
      rows={10}
      totalRecords={data?.total}
      first={page}
      onPage={(e) => setPage(e.page + 1)}
      dataKey="id"
      loading={isLoading || isFetching}
    >
      <Column
        header="Vendor"
        body={({ businessName }) => (
          <div className="row gap-4">
            <img
              src={person}
              alt={businessName}
              className="size-12 rounded-full object-cover"
            />

            <div>
              <p className="font-bold text-[#495057] mb-1">{businessName}</p>
            </div>
          </div>
        )}
      />
      <Column
        header="Social Media Links"
        body={({ socialMediaLinks }) => (
          <SocialMediaLinks
            {...socialMediaLinks}
            pt={{ root: "justify-start gap-2" }}
          />
        )}
      />
      <Column
        header="Social Media Links"
        body={({ rating }) => (
          <Rating
            rating={rating}
            pt={{
              item: "size-3.5",
              onIcon: "text-[#3BB77E]",
              offIcon: "text-[#3BB77E]",
            }}
          />
        )}
      />
      <Column
        header="Business Address"
        body={({ businessAddress }) => {
          const { country, city, state, street } = businessAddress;
          return (
            <>
              <div className="row gap-2">
                <p>{country}</p>
                <i className="pi pi-info-circle hover:text-[#3BB77E] custom-tooltip" />

                <Tooltip target=".custom-tooltip">
                  <div className="text-sm [&>p]:font-bold [&_span]:font-normal">
                    <p>
                      Country: <span>{country}</span>
                    </p>
                    <p>
                      State: <span>{state}</span>
                    </p>
                    <p>
                      City: <span>{city}</span>
                    </p>
                    <p>
                      Street: <span>{street}</span>
                    </p>
                  </div>
                </Tooltip>
              </div>
            </>
          );
        }}
      />
      <Column
        header="Request Status"
        body={({ requestStatus }) => {
          const pending = requestStatus === "pending";
          const approved = requestStatus === "approved";
          const rejected = requestStatus === "rejected";
          return (
            <div
              className={classNames(
                "text-xs font-semibold capitalize",
                "w-fit py-1 px-3 rounded-full",
                {
                  "text-yellow-600 bg-yellow-200": pending,
                  "text-green-600 bg-green-200": approved,
                  "text-red-600 bg-red-200": rejected,
                },
              )}
            >
              {requestStatus}
            </div>
          );
        }}
      />
      <Column
        header="Action"
        body={(vendor) => (
          <>
            <Button
              icon="pi pi-ellipsis-v"
              pt={{
                icon: "text-lg",
                root: "focus:shadow-none hover:text-[#3BB77E]",
              }}
              onClick={(e) => {
                menuRef.current.toggle(e);
                setVendor(vendor);
              }}
            />
            <Menu model={items} popup ref={menuRef} />
          </>
        )}
      />
    </DataTable>
  );
};

export default VendorsList;
