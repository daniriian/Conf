import { DateActionTypes } from "./date.types";
import { VideoCallTypes } from "../videoconferinte/videocall.types";

const INITIAL_STATE = {
  date: new Date(),
};

const dateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DateActionTypes.SET_SELECTED_DATE: {
      return {
        ...state,
        date: action.payload,
      };
    }
    case VideoCallTypes.ADD_VIDEOCONFERENCE_SUCCESS:
      return {
        ...state,
        date: action.payload.data,
      };
    default: {
      return state;
    }
  }
};

export default dateReducer;
