import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GreetPage from "./Pages/GreetPage";
import AppHome from "./Pages/AppHome";
import { SocketReduxWrapperMemoized } from "./components/SocketReduxWrapper";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <GreetPage />
        </Route>
        <Route path="/app">
          <SocketReduxWrapperMemoized>
            <AppHome />
          </SocketReduxWrapperMemoized>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
