import React from "react"
import LoginButton from "../components/buttons/LoginButton"
import {Redirect} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'

function GreetPage() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Redirect to="/app/" />;
  }
  return (
    <div className="max-width-container">
      <div className="greetpage-container">
        <img src="/Logo.png" alt="codecoach-logo" className='logo-image' />
        <div className="greetpage-content-container">
          <p className="greetpage-title">A new way to connect<br />with developers</p>
          <img src="/Connection.png" alt="connected" className='greetpage-image' />
          <p className="greetpage-subtext">Connect・Learn・Code</p>
          <LoginButton />
        </div>
      </div>
    </div>
  )
}

export default GreetPage;
