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
import EditProfilePhoto from "../components/users/EditProfilePhoto";
import QuestionList from "../components/posts/QuestionList";
import { QuestionEdit } from "../components/posts/QuestionEdit";
import SearchBar from "../components/SearchBarPosts";
import SearchQuestions from "../components/posts/SearchedQuestions";
import Tags from "../components/Tags";
import Filter from "../components/Filter";
import FilteredPosts from "../components/posts/FilteredPosts";
import SearchBarUser from "../components/SearchBarUsers";
import SearchedUsersList from "../components/users/SearchedUsers";
import UserFilter from "../components/UserFilter";
import FilteredUsers from "../components/users/FilteredUsers";
import SortPostsButtons from "../components/SortPostButtons/SortPostsButtons";

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
          <div className="max-width-container">
            <div className="main-container">
              <Switch>
                <Route exact path={path}>
                  <div className="layout-left-col">
                    <h1 className="left-col-title">Home</h1>
                    <SortPostsButtons />
                    <SearchBar />
                    <Filter />
                    <Tags />
                  </div>
                  <div className="layout-center-col">
                    <QuestionList />
                  </div>
                  <div className="layout-right-col">
                    <UsersOnline />
                  </div>
                </Route>

                <Route exact path={`${path}/messaging/`}>
                  <div className="layout-left-col">
                    <MessageListComponent />
                  </div>
                  <div className="layout-right-col">
                    <UsersOnline />
                  </div>
                </Route>

                <Route exact path={`${path}/messaging/:id`}>
                  <div className="layout-left-col">
                    <MessageListComponent />
                  </div>
                  <div className="layout-center-col">
                    <ChatComponent />
                  </div>
                  <div className="layout-right-col">
                    <UsersOnline />
                  </div>
                </Route>

                <Route exact path={`${path}/createpost`}>
                  <QuestionForm />
                </Route>

                <Route exact path={`${path}/post/:postId`}>
                  <div className="layout-left-col">
                    <h1 className="left-col-title">Home</h1>
                    <SearchBar />
                    <Filter />
                    <Tags />
                  </div>
                  <div className="layout-center-col">
                    <QuestionPost />
                  </div>
                  <div className="layout-right-col">
                    <UsersOnline />
                  </div>
                </Route>

                <Route exact path={`${path}/users`}>
                  <div className="layout-left-col">
                    <SearchBarUser />
                    <UserFilter />
                  </div>
                  <div className="layout-center-col">
                    <ProfilePage />
                  </div>
                  <div className="layout-right-col">
                    <UsersOnline />
                  </div>
                </Route>

                <Route exact path={`${path}/myprofile`}>
                  <UserProfile />
                </Route>

                <Route exact path={`${path}/editprofile`}>
                  <EditProfile />
                </Route>

                <Route path={`${path}/editprofilephoto`}>
                  <EditProfilePhoto />
                </Route>

                <Route exact path={`${path}/editquestion/:postId`}>
                  <QuestionEdit />
                </Route>

                <Route exact path={`${path}/searchusers`}>
                  <div className="layout-left-col">
                    <SearchBarUser />
                    <UserFilter />
                  </div>
                  <div className="layout-center-col">
                    <SearchedUsersList />
                  </div>
                  <div className="layout-right-col">
                    <UsersOnline />
                  </div>
                </Route>

                <Route exact path={`${path}/posts/:filter`}>
                  <div className="layout-left-col">
                    <h1 className="left-col-title">Home</h1>
                    <SearchBar />
                    <Filter />
                    <Tags />
                  </div>
                  <div className="layout-center-col">
                    <FilteredPosts />
                  </div>
                  <div className="layout-right-col">
                    <UsersOnline />
                  </div>
                </Route>

                <Route exact path={`${path}/search`}>
                  <div className="layout-left-col">
                    <h1 className="left-col-title">Home</h1>
                    <SearchBar />
                    <Filter />
                    <Tags />
                  </div>
                  <div className="layout-center-col">
                    <SearchQuestions />
                  </div>
                  <div className="layout-right-col">
                    <UsersOnline />
                  </div>
                </Route>

                <Route exact path={`${path}/users/:filter`}>
                  <div className="layout-left-col">
                    <SearchBarUser />
                    <UserFilter />
                  </div>
                  <div className="layout-center-col">
                    <FilteredUsers />
                  </div>
                  <div className="layout-right-col">
                    <UsersOnline />
                  </div>
                </Route>
              </Switch>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AppHome;
