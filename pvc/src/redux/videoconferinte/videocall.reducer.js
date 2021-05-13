import { VideoCallTypes } from "./videocall.types";

const INITIAL_STATE = {
  videoCallsList: [], //videoconferintele dintr-o zi
  showAddVideocallDialog: false,
};

const videoCallReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VideoCallTypes.ADD_VIDEOCONFERENCE_STARTED:
      return {
        ...state,
        showAddVideocallDialog: true,
      };
    case VideoCallTypes.ADD_VIDEOCONFERENCE_SUCCESS:
    case VideoCallTypes.ADD_VIDEOCONFERENCE_FAIL:
      return {
        ...state,
        showAddVideocallDialog: false,
      };
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
