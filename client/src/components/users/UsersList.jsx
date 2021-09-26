import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";

function UsersList() {
  const users = useSelector((state) => state.users);

  return (
    <>
      <div className="user-container">
        <ul>
          {users.map((user) => (
            <div key={user.id}>
              <img
                className="avatar"
                src={user.image_url}
                alt={user.username}
              />
              <li>username: {user.username}</li>
              <li>{user.email}</li>
              <li>Role: {user.role}</li>
              <li>Experience: {user.experience}</li>
              <li>Bio: {user.bio}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default UsersList;
