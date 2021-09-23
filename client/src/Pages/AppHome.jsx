import React, {useState} from "react";
import LogoutButton from "../components/buttons/LogoutButton";
import {hello} from "../redux/actions/testAction"
import {sendMessage} from "../redux/actions/messages"
import { useDispatch, useSelector } from 'react-redux'
import UsersOnline from "../components/UsersOnline";
import { useAuth0 } from "@auth0/auth0-react"
import {sendUserDetails} from "../redux/actions/user"

function emailToUsername(email) {
  let username = email.split('@')
  return username[0]
}

function AppHome() {
  const dispatch = useDispatch()
  const { user } = useAuth0()
  const userAccount = useSelector((state) => state.userAccount)
  const messages = useSelector((state) => state.messages)
  const waiting = useSelector(state => state.waiting)

  const [testMessage, setTestMessage] = useState("")

  function testReducerClick() {
    dispatch(hello())
  }

  function dispatchMessage(e) {
    e.preventDefault()
    dispatch(sendMessage(testMessage))
  }

  function setMessageList() {
    return (
    messages.map((message, index) => <li key={index}>{message}</li>)
    )
  }

  if(!waiting) {
    if(userAccount.email === "") {
      const defaultUser = {...user, name: emailToUsername(user.email)}
      dispatch(sendUserDetails(defaultUser))
    }
  }

  const messageList = setMessageList()
  return (
    <div>
      {waiting ? <div className="spinner"></div> : 
      <>
      <h1>Welcome to the Auth Land</h1>
      <ul>
        {messageList}
      </ul>
      <input value={testMessage} onChange={(e) => setTestMessage(e.target.value)} />
      <button onClick={(e) => dispatchMessage(e)}>Submit</button>
      <UsersOnline />
      <LogoutButton />
          <button onClick={() => testReducerClick()}>Test Reducer</button>
          </>}
      
    </div>
  )
}

export default AppHome;