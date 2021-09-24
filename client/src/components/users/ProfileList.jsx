import React from 'react'
import { NavLink } from 'react-router-dom'
import UserProfile from './UserProfile'
import { useSelector } from 'react-redux'

function UsersList({userid, users}) {
  const isJunior = useSelector(globalState => globalState.users.role.junior)
  return (
    <>
  <h1>Choose a mentor</h1>
    <div>
    {users.map((user) =>
          <UserProfile key={user.id} userid={userid} user={user} userRole={isJunior} />
        )}
    </div>
    <div>
        {
          isJunior
            ? <NavLink to='/messages/new' className='button'>Message</NavLink>
            : null
        }
      </div>
  </>
  )
}

export default UsersList
