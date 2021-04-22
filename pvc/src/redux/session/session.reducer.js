import { SessionActionTypes } from "./session.types";

const INITIAL_STATE = {
  csrfToken: null,
};

const SessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SessionActionTypes.GET_SESSION: {
      return {
        ...state,
        csrfToken: action.payload,
      };
    }

    default:
      return state;
  }
};

export default SessionReducer;
