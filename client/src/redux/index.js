import testReducer from "./reducers/testReducer";
import userAccount from "./reducers/user";
import messages from "./reducers/messages";
import usersOnline from "./reducers/usersOnline";
import users from "./reducers/users";
import waiting from "./reducers/waiting";
import commentsByPost from "./reducers/comments";
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
  search,
  tags,
  tagsFilter,
});

export default allReducers;
