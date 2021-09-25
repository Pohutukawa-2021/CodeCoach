import React from 'react'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';


function UserProfile() {
  const user = useSelector((state) => state.userAccount)
  console.log(user)
  return (
    <div className='user-container'>
      <img className='avatar' src={user.image_url} alt={user.username} />
      <p>username: {user.username}</p>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      <p>Experience: {user.experience}</p>
      <p>Bio: {user.bio}</p>
      <NavLink to="/app/editprofile">Edit details</NavLink>
    </div>
  )
}

export default UserProfile
