import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Nav() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div>
        <Link to="/" className="nav">
          Home
        </Link>
        <Link to="/users" className="nav">
          Users
        </Link>
        <Link to="/messages" className="nav">
          Messages
        </Link>
        <Link to="/createpost" className="nav">
          Ask a Question
        </Link>
        <Link to="/myprofile" className="nav">
          Avatar
        </Link>
        <Link to="/app/post/189" className="nav">
          vzxdfh
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
