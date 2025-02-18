import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../usersApiSlice";
import { person } from "../../../assets/images";
import { classNames } from "primereact/utils";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";

const UsersList = ({ show }) => {
  const menuRef = useRef(null);

  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading } = useGetAllUsersQuery({ page });
  const [deleteUser] = useDeleteUserMutation();

  const updateUserData = () => {
    show(user);
  };
  const removeUser = async () => {
    await deleteUser({ id: user.id }).unwrap();
  };

  const items = [
    {
      label: "Options",
      items: [
        {
          label: "Update",
          icon: "pi pi-user-edit",
          command: updateUserData,
        },
        {
          label: "Delete",
          icon: "pi pi-trash",
          command: removeUser,
        },
      ],
    },
  ];

  return (
    <DataTable
      value={data?.users}
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
        header="User"
        body={({
          fullName: { firstName, lastName },
          username,
          profilePicture,
        }) => (
          <div className="row gap-4">
            <img
              src={person}
              alt={firstName}
              className="size-12 rounded-full object-cover"
            />

            <div>
              <p className="font-bold text-[#495057] mb-1">
                {firstName} {lastName}
              </p>
              <span className="text-[#C1C7CE]">#{username}</span>
            </div>
          </div>
        )}
      />
      <Column field="email" header="Email" />
      <Column
        header="Status"
        body={({ status }) => (
          <div
            className={classNames(
              "text-[#006D0E] text-xs font-semibold capitalize",
              "w-fit py-1 px-3 rounded-full bg-[#CCF0D1]"
            )}
          >
            {status}
          </div>
        )}
      />
      <Column field="role" header="Role" />
      <Column
        header="Action"
        body={(user) => {
          return (
            <>
              <Button
                icon="pi pi-ellipsis-v"
                pt={{
                  icon: "text-lg",
                  root: "focus:shadow-none hover:text-[#3BB77E]",
                }}
                onClick={(e) => {
                  menuRef.current.toggle(e);
                  setUser(user);
                }}
              />
              <Menu model={items} popup ref={menuRef} id="popup_menu_left" />
            </>
          );
        }}
      />
    </DataTable>
  );
};

export default UsersList;
