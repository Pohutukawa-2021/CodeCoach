import React from 'react'
import {Link} from 'react-router-dom'
import Nav from '../../components/navigation/Nav'
import LogoutButton from '../../components/buttons/LogoutButton'

function Header() {
  return (
    <div className='header-container'>
      <Link to="/app">
          <div className="logo-container">
            <img src="/logo.jpg" alt="codecoach logo" className='logo-image' />
          </div>
        </Link>
      <Nav />
      <LogoutButton />
    </div>
  )
}

export default Header
