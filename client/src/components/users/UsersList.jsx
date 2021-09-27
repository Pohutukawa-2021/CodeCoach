import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfilePopUp from './ProfilePopUp'

function UsersList() {
  const [popUp, setPopUp] = useState(false)
  const users = useSelector((state) => state.users)
  const [userPopUp, setUserPopUp] = useState({ users })
  
  return (
      <div>
        <main className='users-container'>
        {users.map((user) =>
          <div key={user.id} className="user-container">
            <div className="users-header-container">
              <div className="users-avatar-container">
                <img className='users-avatar' src={user.image_url} alt={user.username} onClick={() => {
                  setUserPopUp(user)
                    setPopUp(true)
                  }} />
              </div>
              <span className="users-username">{user.username}</span>
            </div>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p>{user.experience}</p>
          </div>
          )}     
        </main>
      <ProfilePopUp trigger={popUp} setTrigger={setPopUp}>
        <img className='avatar' src={userPopUp.image_url} alt={userPopUp.username} />
        <span>username: {userPopUp.username}</span>
          <span>{userPopUp.email}</span>
          <span>Role: {userPopUp.role}</span>
          <span>Experience: {userPopUp.experience}</span>
          <span>Bio: {userPopUp.bio}</span>
      </ProfilePopUp> 
      </div>
  );
}

export default UsersList;
