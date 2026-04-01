import React from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const { users } = useSelector((state) => state.UserReducer);
  console.log(users);

  return (
    <>
      {users.map((user, id) => (
        <div key={id}>
          <h4 className="capitalize">username {user?.username} </h4>
          <h5 className="capitalize" > 
            {" "}
            Name -  {user.name?.firstname} {user.name?.lastname}
          </h5>
          <h4>id {user?.id} </h4>
        </div>
      ))}
    </>
  );
};

export default Users;
