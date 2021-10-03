import React from "react";
import LoginButton from "../../components/buttons/LoginButton";
import { Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function GreetPage() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    return <Redirect to="/app/" />;
  }

  return (
    <div className="new-greetpage-container">
      <img className="codecoach-logo" src="/images/Logo.png" alt="codecoach-logo" />
      <div className="greetpage-content-container">
        <div className="wording-container">
          <h1 className="greetpage-header">Become a<br />mentor.<br />Learn from<br />the best.</h1>
          <h2 className="greetpage-subtext">Connect learn code</h2>
          <div className="getstarted-button">
            <LoginButton />
          </div>
        </div>
        <div className="greetpage-images">
          <img src="/images/code-snippet-landingpage.png" alt="" className="codesnippet" />
          <img src="/images/chat-landingpage.svg" alt="" className="comms-image" />
        </div>          
      </div>
    </div>
  );
}

export default GreetPage;
