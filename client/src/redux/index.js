import testReducer from "./reducers/testReducer";
import userAccount from "./reducers/user";
import messages from "./reducers/messages";
import usersOnline from "./reducers/usersOnline";
import users from "./reducers/users";
import waiting from "./reducers/waiting";
import commentsByPost from "./reducers/comments";
import counter from "./reducers/counter";
import searchUser from "./reducers/searchUser";
import search from "./reducers/search";
import posts from "./reducers/posts";
import tags from "./reducers/tags";
import { combineReducers } from "redux";
import tagsFilter from "./reducers/tagsFilter";

const allReducers = combineReducers({
  testReducer,
  userAccount,
  waiting,
  usersOnline,
  messages,
  posts,
  commentsByPost,
  users,
  counter,
  search,
  tags,
  tagsFilter,
  searchUser,
});

export default allReducers;
