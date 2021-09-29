import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
<<<<<<< HEAD
import { ChatbubbleEllipsesOutline } from 'react-ionicons'
import { PeopleOutline } from 'react-ionicons'
import { HomeOutline } from 'react-ionicons'
import { useDetectOutsideClick } from "../../useDetectOutsideClick"
import LogoutButton from "../buttons/LogoutButton"
=======
>>>>>>> 79f2565f318cb9d7c1982834f8bd06846670262d

function Nav() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
<<<<<<< HEAD
      <div className="nav">
        <div className="nav-left-col">
          <Link to="/app" className="nav-link large-screen-logo">Logo</Link>
        </div>
        <div className="nav-center-col">
          <Link to="/app" className="nav-link nav-link-active">
            <HomeOutline
              color={'#ffffff'}
              height="30px"
              width="30px"
            />
          </Link>
          <Link to="/app/users" className="nav-link nav-link-active">
            <PeopleOutline
              color={'#ffffff'}
              height="30px"
              width="30px"
            />
          </Link>
          <Link to="/app/messaging" className="nav-link nav-link-active">
            <ChatbubbleEllipsesOutline
              color={'#ffffff'}
              height="30px"
              width="30px"
            />
          </Link>
          <Link to="/app/createpost" className="nav-link nav-link-ask-question nav-link-active">
            <button className="nav-question-button">Ask Question</button>
          </Link>
        </div>
        <div className="nav-right-col">
          <Link to="/app/myprofile" className="nav-link nav-avatar-link">CP</Link>
          <button onClick={onClick} className="nav-triangle-button">
            <div className="nav-triangle"></div>
          </button>
          <div ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <div>
              <LogoutButton />
            </div>
          </div>
        </div>
=======
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
>>>>>>> 79f2565f318cb9d7c1982834f8bd06846670262d
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
