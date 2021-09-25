import testReducer from "./reducers/testReducer";
import userAccount from "./reducers/user";
import messages from "./reducers/messages";
import usersOnline from "./reducers/usersOnline";
import users from "./reducers/users";
import waiting from "./reducers/waiting";

import posts from "./reducers/posts";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  testReducer,
  userAccount,
  waiting,
  usersOnline,
  messages,
  posts,
  users
});

export default allReducers;
