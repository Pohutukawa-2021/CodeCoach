import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersOnline from "../components/UsersOnline";
import { useAuth0 } from "@auth0/auth0-react";
import { sendUserDetails } from "../redux/actions/user";
import Header from "../layouts/header/Header";
import { QuestionForm } from "../components/posts/QuestionForm";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ChatComponent from "../components/ChatComponent";
import { PostComponent } from "../components/posts/PostComponent";
import UserProfile from "../components/users/UserProfile";
import UsersList from "../components/users/UsersList";

function emailToUsername(email) {
  let username = email.split("@");
  return username[0];
}

function AppHome() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const { path } = useRouteMatch();
  const userAccount = useSelector((state) => state.userAccount);
  const waiting = useSelector((state) => state.waiting);

  if (!waiting) {
    if (userAccount.email === "") {
      const defaultUser = { ...user, name: emailToUsername(user.email) };
      dispatch(sendUserDetails(defaultUser));
    }
  }

  return (
    <div>
      {waiting ? (
        <div className="spinner"></div>
      ) : (
        <>
          <UsersOnline />
          <Header />
          <QuestionForm />
          <Switch>
            <Route exact path={path}>
              <h1>Home</h1>
            </Route>
            <Route exact path={`${path}/messaging/:id`}>
              <ChatComponent />
            </Route>
            <Route path={`${path}/post/:postId`}>
              <PostComponent />
            </Route>
            <Route path={`${path}/users`}>
              <UsersList />
            </Route>
            <Route path={`${path}/myprofile`}>
              <UserProfile />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
}

export default AppHome;
