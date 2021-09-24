import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const { isAuthenticated } = useAuth0()

  if(isAuthenticated) {
  return (
    <div className='nav'>
      <div className='nav-left'>
        <div className='large-screen-logo-container'>Logo</div>
      </div>
      <div className='nav-center'>
        <Link to="/app" className='nav-link'>Home</Link>
        <Link to="/users" className='nav-link'>Users</Link>
        <Link to="/messages" className='nav-link'>Messages</Link>
        <Link to="/createpost" className='nav-link'>Ask a Question</Link>        
      </div>
      <div className='nav-right'>
        <Link to="/myprofile" className='nav'>Avatar</Link>
        <div to="" className='nav'>&#x25BC;</div>
      </div>
    </div>
  )
}
  if(!isAuthenticated) {
    return (
      <div>
        <Link to="/" className='nav'>Home</Link>
        <Link to="/" className='nav'>Sign In</Link>
        <Link to="/" className='nav'>Register</Link>
      </div>
    )
  }

}
export default Nav
