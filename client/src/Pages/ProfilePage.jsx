import React from 'react'
import UsersList from '../components/users/UsersList'


function ProfilePage() {
  return (
    <>
      <div className="center-col-container">
        <h2 className="center-col-title">Users</h2>
        <UsersList />
      </div>
    </>
  )
}

export default ProfilePage
