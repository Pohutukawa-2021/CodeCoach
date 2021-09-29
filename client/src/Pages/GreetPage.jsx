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
        <img src="/logo.png" alt="codecoach-logo" className='logo-image' />
        <div className="greetpage-content-container">
          <div className="greetpage-text-container">
            <h1 className="greetpage-title">Become a<br />mentor</h1>
            <h1 className="greetpage-title">Learn from<br />the best</h1>
            <p className="greetpage-subtext">Connect learn code</p>          
            <LoginButton />
          </div>
          <div className="greetpage-images-container">
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GreetPage;
