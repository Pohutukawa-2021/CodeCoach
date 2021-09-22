import testReducer from "./reducers/testReducer";
import user from "./reducers/user";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  testReducer,
  user
})

export default allReducers;