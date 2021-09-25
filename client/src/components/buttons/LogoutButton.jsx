import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="signout-text" onClick={() => logout({ returnTo: window.location.origin })}>
      Sign Out
    </button>
  );
};

export default LogoutButton;