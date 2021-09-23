import React from "react"
import LoginButton from "../components/buttons/LoginButton"
import {Redirect} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'
import Header from "../layouts/header/Header"
import Search from "../layouts/sidebar/Search"

function GreetPage() {
  const {isAuthenticated} = useAuth0()

  if(isAuthenticated) {
    return <Redirect to="/app/" />
  }
  return (
    <div>
    <Header />
    <h1>Hello</h1>
    <LoginButton />
    <Search />

    </div>
  )
}

export default GreetPage;