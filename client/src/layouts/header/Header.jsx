import React from 'react'
import {Link} from 'react-router-dom'
import Nav from '../../components/navigation/Nav'

function Header() {
  return (
    <div className='header-container'>
      <Link to="/app">
        <div className="mobile-logo-container">
          <img src="/logo.png" alt="codecoach logo" className='logo-image' />
        </div>
      </Link>
      <Nav />
    </div>
  )
}

export default Header
