import React from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'

function UsersList() {
  const users = useSelector((state) => state.users)
  
  return (
    <>
    <div className='user-container'>
    <ul>
      {users.map((user) => 
      <div key={user.id}>
            <img className='avatar' src={user.image_url} alt={user.username} />
            <p>username: {user.username}</p>
            <p>Role: {user.role}</p>
      </div>
            )}
    </ul>
    </div>
    </>
  )
}

export default UsersList
