import React  from 'react'

function ProfilePopUp(props) {
  return (props.trigger) ? (
    <div>
      <button className="close-button" onClick={() => props.setTrigger(false)}>&#10005;</button>
      <div>
       {props.children}
      </div>
    </div>
  ) : "";
}

export default ProfilePopUp
