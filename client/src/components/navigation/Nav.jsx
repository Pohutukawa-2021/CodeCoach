import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Nav() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div>
        <Link to="/app" className="nav">
          Home
        </Link>
        <Link to="/app/users" className="nav">
          Users
        </Link>
        <Link to="/app/messaging" className="nav">
          Messages
        </Link>
        <Link to="/app/createpost" className="nav">
          Ask a Question
        </Link>
        <Link to="/app/myprofile" className="nav">
          Avatar
        </Link>
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div>
        <Link to="/" className="nav">
          Home
        </Link>
        <Link to="/" className="nav">
          Sign In
        </Link>
        <Link to="/" className="nav">
          Register
        </Link>
      </div>
    );
  }
}
export default Nav;
