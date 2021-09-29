import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UsersOnline() {
  const usersOnline = useSelector((state) => state.usersOnline);
  function setUsersOnlineList() {
    let test = [];
    Object.entries(usersOnline).forEach(([key, value]) => {
      test.push(
        <div key={key} id={value.auth_id}>
          <Link to={`/app/messaging/${value.id}`} className="online-user-link">
            <img src={value.image_url} alt={value.username} className="online-user-avatar" />
            <p className="onlineusers-name">{value.username}</p>
          </Link>
        </div>
      );
    });
    return test;
  }

  const onlineList = setUsersOnlineList();
  return (
    <div className="layout-right-col">
      <h3 className="right-col-title">Online Users</h3>
      <div className="online-user-list">{onlineList}</div>
    </div>
  );
}

export default UsersOnline;
