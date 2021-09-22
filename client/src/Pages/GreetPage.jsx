import React from "react"
import LoginButton from "../components/LoginButton"
import {Redirect} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'


function GreetPage() {
  const {isAuthenticated} = useAuth0()


  if(isAuthenticated) {
    return <Redirect to="/app/" />
  }
  return (
    <div>
    <h1>Hello</h1>
    <LoginButton />

    </div>
  )
}

export default GreetPage;