import React from 'react'
import Header from '../layouts/header/Header'
import UsersList from '../components/users/UsersList'
import UsersOnline from '../components/UsersOnline'


function ProfilePage() {
  return (
    <div>
      <Header />
      <UsersList />
      <UsersOnline />
    </div>
  )
}

export default ProfilePage
