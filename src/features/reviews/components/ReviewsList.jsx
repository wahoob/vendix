import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";

import { Rating } from "../../../components";
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from "../reviewsApiSlice";
import { formatShortDate } from "../../../utils/functions.utils";

const ReviewsList = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading } = useGetAllReviewsQuery({ page });
  const [deleteReview] = useDeleteReviewMutation();

  return (
    <DataTable
      value={data?.reviews}
      paginator
      lazy
      rows={10}
      totalRecords={data?.total}
      first={page}
      onPage={(e) => setPage(e.page + 1)}
      dataKey="id"
      loading={isLoading || isFetching}
    >
      <Column field="product" header="Product ID" />
      <Column
        field="user"
        header="User Name"
        body={({ user }) =>
          `${user.fullName.firstName} ${user.fullName.lastName}`
        }
      />
      <Column
        field="comment"
        header="Comment"
        body={({ comment }) => (
          <div className="max-w-64 truncate leading-normal">{comment}</div>
        )}
      />
      <Column
        field="rating"
        header="Rating"
        body={({ rating }) => (
          <Rating
            rating={{ ratingsAverage: rating }}
            pt={{
              item: "size-4",
              onIcon: "text-[#FF7C0B]",
              offIcon: "text-[#FF7C0B]",
            }}
          />
        )}
      />
      <Column
        field="createdAt"
        header="Created Date"
        body={({ createdAt }) => formatShortDate(createdAt)}
      />
      <Column
        header="Action"
        body={(review) => (
          <Button
            icon="pi pi-trash"
            severity="danger"
            pt={{
              root: "bg-red-500 hover:bg-red-600 px-3 py-2",
              icon: "text-white",
            }}
            onClick={() => deleteReview({ id: review._id })}
          />
        )}
      />
    </DataTable>
  );
};

export default ReviewsList;
