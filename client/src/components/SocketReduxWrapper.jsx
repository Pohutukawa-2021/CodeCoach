import {useState, useEffect, memo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import { Provider } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import allReducers from '../redux'
import { Redirect } from 'react-router-dom'

export function SocketReduxWrapper({ children }) {
  const [jwt, setJwt] = useState("")
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  async function getToken() {
    const accessToken = await getAccessTokenSilently({
      audience: "http://CodeCouchSocket.com/api",
    });
    setJwt(accessToken);
  }

  useEffect(() => {
    getToken()
  }, [])

  if(!isAuthenticated) {
    return <Redirect to="/" />
  }

  console.log("rerender")
  if(jwt !== '') {
    const socket = io('http://localhost:3001', {
      query: `token=${jwt}`
    })

    const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

    const store = applyMiddleware(socketIoMiddleware)(createStore)(allReducers)
    return <Provider store={store}>{children}</Provider>
  } else {
    const socket = io("http://192.168.1.207:3001");
    const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
    const store = applyMiddleware(socketIoMiddleware)(createStore)(allReducers);
    return <Provider store={store}><div className="spinner"></div></Provider>;
  }
}

export const SocketReduxWrapperMemoized = memo(SocketReduxWrapper)