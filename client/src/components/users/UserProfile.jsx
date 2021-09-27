import React from 'react'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';


function UserProfile() {
  const user = useSelector((state) => state.userAccount)
  return (
    <>
      <div className="layout-left-col"></div>
      <div className="layout-center-col">
        <div className="center-col-container">
          <div className="profile-container">
            <div className="profile-header-container">
              <img className='profile-avatar' src={user.image_url} alt={user.username} />
              <div className="profile-title-container">
                <p className="profile-username">{user.username}</p>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="profile-content-container">
              <p className="profile-content">Role: {user.role}</p>
              <p className="profile-content">Experience: {user.experience}</p>
              <p className="profile-content">Bio: {user.bio}</p>
              <button className="small-button small-button-styling">
                <NavLink className="edit-profile-button-link" to="/app/editprofile">Edit details</NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-right-col"></div>
    </>
  )
}

export default UserProfile

// if userAccount is === to currentUser use userAccount
// if not use Users