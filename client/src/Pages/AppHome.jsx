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
import SearchBar from "../components/SearchBarPosts";
import SearchQuestions from "../components/posts/SearchedQuestions";
import Tags from "../components/Tags";
import Filter from "../components/Filter";
import FilteredPosts from "../components/posts/FilteredPosts";
import SearchBarUser from "../components/SearchBarUsers";
import SearchedUsersList from "../components/users/SearchedUsers";
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
          <Header />
          <UsersOnline />
          <Switch>
            <Route exact path={path}>
              <SearchBar />
              <Tags />
              <Filter />
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
              <SearchBar />
              <Tags />
              <QuestionPost />
            </Route>
            <Route path={`${path}/users`}>
              <SearchBarUser />
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
            <Route exact path={`${path}/:filter`}>
              <Tags />
              <Filter />
              <FilteredPosts />
            </Route>
            <Route path={`${path}/blah`}>
              <SearchBarUser />
              <SearchedUsersList />
            </Route>
            <Route path={`${path}/search`}>
              <SearchBar />
              <Tags />
              <Filter />
              <SearchQuestions />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
}

export default AppHome;
