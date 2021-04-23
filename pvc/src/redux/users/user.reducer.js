import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  errorMessage: undefined,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.START_USER_LOG_IN: {
      return {
        ...state,
        loading: true,
      };
    }

    case UserActionTypes.USER_LOG_IN_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        errorMessage: undefined,
      };
    }

    case UserActionTypes.USER_LOG_IN_FAILURE: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    }

    case UserActionTypes.LOG_USER_OUT: {
      return {
        ...state,
        currentUser: null,
      };
    }

    default:
      return state;
  }
};

export default UserReducer;
