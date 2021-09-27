import React  from 'react'

function ProfilePopUp(props) {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
       {props.children}
      </div>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>&#10005;</button>
    </div>
  ) : "";
}

export default ProfilePopUp
