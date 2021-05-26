import { combineReducers } from "redux";

import UserReducer from "./users/user.reducer";
import dateReducer from "./date/date.reducer";
import videoCallReducer from "./videoconferinte/videocall.reducer";
import ParticipantsReducer from "./videocallParticipants/participants.reducer";
import callReducer from "./call/call.reducer";

export default combineReducers({
  user: UserReducer,
  selectedDate: dateReducer,
  videoCalls: videoCallReducer,
  participants: ParticipantsReducer,
  call: callReducer,
});
