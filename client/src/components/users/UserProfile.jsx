import React from 'react'
import { useSelector } from "react-redux";


function UserProfile() {
  const user = useSelector((state) => state.userAccount)
  return (
    <div className='user-container'>
      <img className='avatar' src={user.image_url} alt={user.username} />
      <p>username: {user.username}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}

export default UserProfile
