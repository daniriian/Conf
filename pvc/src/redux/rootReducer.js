import { combineReducers } from "redux";

import UserReducer from "./users/user.reducer";
import dateReducer from "./date/date.reducer";

export default combineReducers({
  user: UserReducer,
  selectedDate: dateReducer,
});
