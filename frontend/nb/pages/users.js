import React, { useState, useEffect } from "react";
export default function users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data?.users);
      });
  }, []);

  console.log("users", users);

  return (
    <div>
      <h1>User List</h1>
      {users ? (
        users?.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
