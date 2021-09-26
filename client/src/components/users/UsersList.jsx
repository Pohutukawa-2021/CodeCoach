import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDetectOutsideClick } from '../../useDetectOutsideClick'

function UsersList() {
  const users = useSelector((state) => state.users)
  const popUpRef = useRef(null);
  console.log(popUpRef);
  const [isActive, setIsActive] = useDetectOutsideClick(popUpRef, false);
  const onClick = () => setIsActive(!isActive);
  return (
    <div className='container'>
      <div className='user-container'>
        {users.map((user) => 
          <button key={user.id} onClick={onClick} className="menu-trigger">
          <img className='avatar' src={user.image_url} alt={user.username} />
          <span>username: {user.username}</span>
          <span>{user.email}</span>
          <span>Role: {user.role}</span>
          <span>Experience: {user.experience}</span>
          <span>Bio: {user.bio}</span>
          </button>     
      )}
          <div ref={popUpRef}
          className={`menu ${isActive ? "active" : "inactive"}`}>
        <p>IM A POP UP</p>
        </div>
      </div>
    </div>
  )
}

export default UsersList;
