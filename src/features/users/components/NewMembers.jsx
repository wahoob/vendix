import { AsyncContentWrapper } from "../../../components";
import UserCard from "./UserCard";

import { useGetAllUsersQuery } from "../usersApiSlice";

const NewMembers = () => {
  const { data, isError, isFetching, isLoading, isSuccess, error } =
    useGetAllUsersQuery({ sort: "-createdAt", limit: 3 });

  return (
    <AsyncContentWrapper
      isError={isError}
      error={error}
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
      render={() => (
        <div className="space-y-6">
          {data.users.map((user) => (
            <UserCard
              key={user.id}
              name={`${user.fullName.firstName} ${user.fullName.lastName}`}
              role={user.role}
            />
          ))}
        </div>
      )}
    />
  );
};

export default NewMembers;
