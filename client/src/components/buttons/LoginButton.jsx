import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
<<<<<<< HEAD
    <button className='large-button' onClick={() => loginWithRedirect()}>Get Started</button>
  )
};
=======
    <div className="btn-container">
      <button className="login-btn" onClick={() => loginWithRedirect()}>
        Get Started
      </button>
    </div>
  );
}
>>>>>>> 79f2565f318cb9d7c1982834f8bd06846670262d

export default LoginButton;
