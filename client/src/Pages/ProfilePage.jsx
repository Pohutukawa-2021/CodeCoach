import React from 'react'
import UsersList from '../components/users/UsersList'


function ProfilePage() {
  return (
    <>
      <div className="layout-left-col"></div>
      <div className="layout-center-col">
        <div className="center-col-container">
          <h2>Developers List</h2>
          <UsersList />
        </div>
      </div>
    </>
  )
}

export default ProfilePage
