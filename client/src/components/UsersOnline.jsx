import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function UsersOnline() {
  const usersOnline = useSelector((state) => state.usersOnline);

  function setUsersOnlineList() {
    let test = [];
    Object.entries(usersOnline).forEach(([key, value]) => {
      test.push(
        <li key={key} id={value.user.auth_id}>
          <NavLink to={`/app`}>
            <img src={value.user.image_url} alt={value.user.username} />
          </NavLink>
        </li>
      );
    });
    return test;
  }

  const onlineList = setUsersOnlineList();
  return (
    <div>
      <h3>Online Users</h3>
      <ul>{onlineList}</ul>
    </div>
  );
}

export default UsersOnline;
