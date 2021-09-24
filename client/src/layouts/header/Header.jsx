import React from 'react'
import Nav from '../../components/navigation/Nav'
import LogoutButton from '../../components/buttons/LogoutButton'

function Header() {
  return (
    <div className='header-container'>
      <span>Logo</span>
      <Nav />
      <LogoutButton />
    </div>
  )
}

export default Header
