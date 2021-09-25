import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UsersOnline() {
  const usersOnline = useSelector((state) => state.usersOnline);

  function setUsersOnlineList() {
    let test = [];
    Object.entries(usersOnline).forEach(([key, value]) => {
      test.push(
        <li key={key} id={value.auth_id} className="online-user-list-item">
          <Link to={`/app/messaging/${value.id}`}>
            <img src={value.image_url} alt={value.username} />
          </Link>
        </li>
      );
    });
    return test;
  }
  const onlineList = setUsersOnlineList();
  return (
    <div>
      <h2 className="right-col-title">Online Users</h2>
      <ul className="online-user-list">{onlineList}</ul>
    </div>
  );
}

export default UsersOnline;
