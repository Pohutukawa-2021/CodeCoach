import React from "react";
import LoginButton from "../../components/buttons/LoginButton";
import { Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function GreetPage() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Redirect to="/app/" />;
  }

  return (
    <div>
      <img src="/logo.png" alt="codecoach-logo" className="logo-image" />
      <div className="center">
        <p className="greeting">A new way to connect with developers</p>
        <img src="/connection.png" alt="connected" className="greetimage" />
        <p className="words">Connect・Learn・Code</p>
      </div>
      <div className="center">
        <LoginButton />
      </div>
    </div>
  );
}

export default GreetPage;
