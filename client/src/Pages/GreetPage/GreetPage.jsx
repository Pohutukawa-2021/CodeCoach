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
    <div className="greetpage-container">
      <div className="greetpage-content-container">
        <div className="header-container">
          <div className="large-screen-logo-container">
            <img src="/images/Logo.png" alt="codecoach-logo" />
          </div>
        </div>

        <p className="greetpage-subtext">
          A new way to connect with developers
        </p>
        <div className="center">
          <img
            src="/images/Connection.png"
            alt="connected"
            className="greetpage-image"
          />
        </div>
        <p className="greetpage-subtext">Kodine</p>
        <div className="center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default GreetPage;
