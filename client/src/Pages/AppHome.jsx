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
import MessageListComponent from "../components/MessageListComponent";
import ProfilePage from "./ProfilePage";
import EditProfile from "../components/users/EditProfile";

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
            <div className="max-width-container">
              <div className="main-container">
                <div className="layout-left-col">
                  <Route exact path={path}>
                      <h1 className="left-col-title">Home</h1>
                  </Route>
                  <Route path={`${path}/messages`}>
                    <MessageListComponent />
                  </Route>
                </div>
                <div className="layout-center-col">                                  
                  <Route exact path={`${path}/messaging/:id`}>
                    <ChatComponent />
                  </Route>
                  <Route exact path={`${path}/createpost`}>
                    <QuestionForm />
                  </Route>
                  <Route path={`${path}/post/:postId`}>
                    <PostComponent />
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
                </div>
                <div className="layout-right-col">
                <Route path={path}>
                  <UsersOnline />
                </Route>
                </div>
              </div>
            </div>
        </>
      )}
    </div>
  );
}

export default AppHome;
