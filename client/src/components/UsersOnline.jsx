import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react'

function UsersOnline() {
  const usersOnline = useSelector((state) => state.usersOnline)
  
  function setUsersOnlineList() {
    let test = []
    Object.entries(usersOnline).forEach(([key, value]) => {
      test.push(key)
      console.log(value)
    })
    return test.map(key => <li>{key}</li>)
  }

  console.log(usersOnline)
  const onlineList = setUsersOnlineList()
  return(
    <ul>
    {onlineList}
    </ul>
  )
}

export default UsersOnline;