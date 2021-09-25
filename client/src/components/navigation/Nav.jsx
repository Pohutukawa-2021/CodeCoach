import React, { useRef} from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ChatboxEllipsesOutline } from 'react-ionicons'
import { PeopleOutline } from 'react-ionicons'
import { HomeOutline } from 'react-ionicons'
import { useDetectOutsideClick } from "../../useDetectOutsideClick"
import LogoutButton from "../buttons/LogoutButton"

function Nav() {
  const { isAuthenticated } = useAuth0();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  if (isAuthenticated) {
    return (
      <div className="nav">
        <div className="nav-left-col">
          <Link to="/" className="nav-link large-screen-logo">Logo</Link>
        </div>
        <div className="nav-center-col">
          <Link to="/" className="nav-link nav-link-active">
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
          <Link to="/messages" className="nav-link nav-link-active">
            <ChatboxEllipsesOutline
              color={'#ffffff'}
              height="30px"
              width="30px"
            />
          </Link>
          <Link to="/createpost" className="nav-link nav-link-ask-question nav-link-active">
            <button className="nav-question-button">Ask Question</button>
          </Link>
        </div>
        <div className="nav-right-col">
          <Link to="/myprofile" className="nav-link nav-avatar-link">CP</Link>
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
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div>
      </div>
    );
  }
}
export default Nav;
