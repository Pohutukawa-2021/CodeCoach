import testReducer from "./reducers/testReducer";
import user from "./reducers/user";
import messages from "./reducers/messages";
import usersOnline from "./reducers/usersOnline";
import waiting from "./reducers/waiting";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  testReducer,
  user,
  waiting,
  usersOnline,
  messages
})

export default allReducers;