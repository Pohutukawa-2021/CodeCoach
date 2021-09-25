import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
  <>
    <Auth0Provider
    domain="dev-ngqwdtsq.us.auth0.com"
    clientId="F5zt73D2nJqsidW1kmelY4v2MduiO0gB"
    redirectUri={window.location.origin}
    audience="http://CodeCouchSocket.com/api"
    >
    <App />
    </Auth0Provider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
