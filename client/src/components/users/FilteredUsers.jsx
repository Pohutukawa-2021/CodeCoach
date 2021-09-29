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
      <div className="center-col-container">
        <main className='users-container'>
        {filteredUsers.map((user) =>
          <div key={user.id} onClick={() => {
            setUserPopUp(user)
            setPopUp(true)
          }} className="user-container">
            <div className="users-header-container">
              <div className="users-avatar-container">
                <img className='users-avatar' src={user.image_url} alt={user.username} />
              </div>
              <span className="users-username">{user.username}</span>
            </div>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p>{user.experience}</p>
          </div>
          )}     
      </main>
      <div className="user-popup-container">
        <ProfilePopUp trigger={popUp} setTrigger={setPopUp}>
          <div className="user-popup">
            <div className="profile-header-container">
              <img className='profile-avatar' src={userPopUp.image_url} alt={userPopUp.username} />
              <div className="profile-title-container">
                <p className="profile-username">{userPopUp.username}</p>
                <p>{userPopUp.email}</p>
              </div>
            </div>
            <div>
              <p className="profile-content profile-content-label">Role</p>
              <p className="profile-content">{userPopUp.role}</p>
              <p className="profile-content profile-content-label">Experience</p>
              <p className="profile-content">{userPopUp.experience}</p>
              <p className="profile-content profile-content-label">Bio</p>
              <p className="profile-content">{userPopUp.bio}</p>
            </div>
          </div>
        </ProfilePopUp>
      </div>
      </div>
    </>
  );
}

export default FilteredUsers;
