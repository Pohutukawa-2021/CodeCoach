import testReducer from "./reducers/testReducer";
import userAccount from "./reducers/user";
import messages from "./reducers/messages";
import usersOnline from "./reducers/usersOnline";
import waiting from "./reducers/waiting";
import directMessage from "./reducers/directMessage";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  testReducer,
  userAccount,
  waiting,
  directMessage,
  usersOnline,
  messages,
});

export default allReducers;
