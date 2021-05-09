import { VideoCallTypes } from "./videocall.types";

const INITIAL_STATE = {
  videoCallsList: [], //videoconferintele dintr-o zi
};

const videoCallReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VideoCallTypes.GET_VIDEOCONFERENCES_BY_DATE_SUCCESS:
    case VideoCallTypes.GET_VIDEOCONFERENCES_BY_DATE_FAIL:
      return {
        ...state,
        videoCallsList: action.payload,
      };

    default:
      return state;
  }
};

export default videoCallReducer;
