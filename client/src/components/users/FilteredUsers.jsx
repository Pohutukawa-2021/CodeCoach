import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import ProfilePopUp from "./ProfilePopUp";

function FilteredUsers() {
  const [popUp, setPopUp] = useState(false);
  const allUsers = useSelector((state) => state.users);
  const [userPopUp, setUserPopUp] = useState({ allUsers });
  const { filter } = useParams();
  let filteredUsers = [];

  if (filter === "junior") {
    const juniors = allUsers.filter((user) => user.role === "junior");
    filteredUsers = juniors;
  } else {
    const seniors = allUsers.filter((user) => user.role === "senior");
    filteredUsers = seniors;
  }

  return (
    <>
      <div>
        <div className="user-container">
          {filteredUsers.map((user) => (
            <div key={user.id}>
              <img
                className="avatar"
                src={user.image_url}
                alt={user.username}
                onClick={() => {
                  setUserPopUp(user);
                  setPopUp(true);
                }}
              />
              <span>Username: {user.username}</span>
              <span>{user.email}</span>
              <span>Role: {user.role}</span>
              <span>Experience: {user.experience}</span>
              <span>Bio: {user.bio}</span>
            </div>
          ))}
          <ProfilePopUp trigger={popUp} setTrigger={setPopUp}>
            <img
              className="avatar"
              src={userPopUp.image_url}
              alt={userPopUp.username}
            />
            <span>Username: {userPopUp.username}</span>
            <span>{userPopUp.email}</span>
            <span>Role: {userPopUp.role}</span>
            <span>Experience: {userPopUp.experience}</span>
            <span>Bio: {userPopUp.bio}</span>
          </ProfilePopUp>
        </div>
      </div>
    </>
  );
}

export default FilteredUsers;
