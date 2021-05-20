import { VideoCallTypes } from "./videocall.types";

const INITIAL_STATE = {
  videoCallsList: [], //videoconferintele dintr-o zi
  showAddVideocallDialog: false,
  aproveRemoval: false,
  showDeleteDialog: false,
  selectedVideocall: null,
  dialogMode: "Add",
};

const videoCallReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VideoCallTypes.ADD_VIDEOCONFERENCE_STARTED:
      return {
        ...state,
        showAddVideocallDialog: true,
        dialogMode: "Add",
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

    case VideoCallTypes.DELETE_VIDEOCONFERENCE_STARTED:
    case VideoCallTypes.DELETE_VIDEOCONFERENCE_SUCCESS:
    case VideoCallTypes.DELETE_VIDEOCONFERENCE_FAIL:
      return {
        ...state,
        showDeleteDialog: action.payload,
      };

    case VideoCallTypes.MARK_VIDEOCALL:
      return {
        ...state,
        selectedVideocall: action.payload,
      };

    case VideoCallTypes.UNMARK_VIDEOCALL:
      return {
        ...state,
        selectedVideocall: action.payload,
      };

    case VideoCallTypes.EDIT_VIDEOCALL_STARTED:
      return {
        ...state,
        dialogMode: "Edit",
        showAddVideocallDialog: "true",
      };

    case VideoCallTypes.EDIT_VIDEOCALL_SUCCESS:
    case VideoCallTypes.EDIT_VIDEOCALL_FAIL:
      return {
        ...state,
        showAddVideocallDialog: false,
      };

    default:
      return state;
  }
};

export default videoCallReducer;
