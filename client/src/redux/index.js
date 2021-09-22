import testReducer from "./reducers/testReducer";
import user from "./reducers/user";
import messages from "./reducers/messages";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  testReducer,
  user,
  messages
})

export default allReducers;