import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import UsersOnline from "../components/UsersOnline/UsersOnline";
import { sendUserDetails } from "../redux/actions/user";
import Header from "../layouts/header/Header";
import { QuestionForm } from "../components/posts/QuestionForm";
import ChatComponent from "../components/ChatComponent";
import { QuestionPost } from "../components/posts/QuestionPost";
import UserProfile from "../components/users/UserProfile";
import MessageListComponent from "../components/MessageListComponent/MessageListComponent";
import ProfilePage from "./ProfilePage";
import EditProfile from "../components/users/EditProfile";
import QuestionList from "../components/posts/QuestionList";
import { QuestionEdit } from "../components/posts/QuestionEdit";
import SearchBar from "../components/SearchBar";
import SearchQuestions from "../components/posts/SearchedQuestions";
import Tags from "../components/Tags";

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
  //console.log(userAccount);
  return (
    <div>
      {waiting ? (
        <div className="spinner"></div>
      ) : (
        <>
          <Header />
          <UsersOnline />
              <SearchBar />
          <Switch>
            <Route exact path={path}>
              <Tags />
              <QuestionList />
            </Route>
            <Route exact path={`${path}/messaging/`}>
              <MessageListComponent />
            </Route>
            <Route exact path={`${path}/messaging/:id`}>
              <ChatComponent />
            </Route>
            <Route path={`${path}/createpost`}>
              <QuestionForm />
            </Route>
            <Route path={`${path}/post/:postId`}>
              <Tags />
              <QuestionPost />
            </Route>
            <Route path={`${path}/users`}>
              <ProfilePage />
            </Route>
            <Route path={`${path}/myprofile`}>
              <UserProfile />
            </Route>
            <Route path={`${path}/editprofile`}>
              <EditProfile />
            </Route>
            <Route path={`${path}/editquestion/:postId`}>
              <QuestionEdit />
            </Route>
            <Route path={`${path}/search`}>
              <SearchQuestions />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
}

export default AppHome;
