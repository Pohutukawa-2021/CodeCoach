import React from 'react'
import Header from '../layouts/header'
import ProfileList from '../components/users/ProfileList'
import UsersOnline from '../components/UsersOnline'


function ProfilePage() {
  return (
    <div>
      <Header />
      <ProfileList />
      <UsersOnline />
    </div>
  )
}

export default ProfilePage
