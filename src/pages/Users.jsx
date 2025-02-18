import { useState } from "react";
import { UsersList, UserUpdatePrompt } from "../features/users";

const Users = () => {
  const [userData, setUserData] = useState(null);

  const showUpdatePrompt = (data) => {
    setUserData(data);
  };
  const hideUpdatePrompt = () => setUserData(null);

  return (
    <>
      <UserUpdatePrompt
        visible={!!userData}
        user={userData}
        onHide={hideUpdatePrompt}
      />
      <div className="space-y-4">
        <h1 className="text-4xl font-bold mb-1">Users list</h1>

        <div className="card">
          <UsersList show={showUpdatePrompt} />
        </div>
      </div>
    </>
  );
};

export default Users;
