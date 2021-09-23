import React from 'react';
import { useSelector } from 'react-redux';

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