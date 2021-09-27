import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { Link } from "react-router-dom";

function UsersList() {
  const users = useSelector((state) => state.users);

  return (
    <>      
      <div className="users-container">
        {users.map((user) => (
          <Link to="" className="user-container">
            <div key={user.id}>
              <div className="users-header-container">
                <div className="users-avatar-container">
                  <img className="users-avatar" src={user.image_url} alt={user.username} />
                </div>
                <p className="users-username">{user.username}</p>
              </div>
              <p>{user.role}</p>
              <p>{user.experience}</p>
              <p>{user.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default UsersList;
