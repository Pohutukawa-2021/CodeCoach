import React from "react";
import LogoutButton from "../components/LogoutButton";
import {hello} from "../redux/actions/testAction"
import { useDispatch, useSelector } from 'react-redux'

function AppHome() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  function testReducerClick() {
    dispatch(hello())
  }
  
  console.log(user)
  return (
    <div>
      <h1>Welcome to the Auth Land</h1>
      <LogoutButton />
          <button onClick={() => testReducerClick()}>Test Reducer</button>
    </div>
  )
}

export default AppHome;