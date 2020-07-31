import React, { useState } from "react";
import User from "./User";
import { useUserState, useUserDispatch, getUsers } from "./UserContext";

const Users = () => {
  const [userId, setUserId] = useState(null);
  const state = useUserState();
  const dispatch = useUserDispatch();

  const { data: users, loading, error } = state.users;
  const fetchData = () => {
    getUsers(dispatch);
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error...!</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: "pointer" }}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
};

export default Users;
