import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton(){
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="btn-container">
  <button className='login-btn' onClick={() => loginWithRedirect()}>Get Started</button>
  </div>
  )
};

export default LoginButton;