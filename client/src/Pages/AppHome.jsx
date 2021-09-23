import React, {useState} from "react";
import LogoutButton from "../components/buttons/LogoutButton";
import {hello} from "../redux/actions/testAction"
import {sendMessage} from "../redux/actions/messages"
import { useDispatch, useSelector } from 'react-redux'

function AppHome() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const messages = useSelector((state) => state.messages)

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
  
  console.log(user)
  const messageList = setMessageList()
  return (
    <div>
      <h1>Welcome to the Auth Land</h1>
      <ul>
        {messageList}
      </ul>
      <input value={testMessage} onChange={(e) => setTestMessage(e.target.value)} />
      <button onClick={(e) => dispatchMessage(e)}>Submit</button>
      <LogoutButton />
          <button onClick={() => testReducerClick()}>Test Reducer</button>
    </div>
  )
}

export default AppHome;