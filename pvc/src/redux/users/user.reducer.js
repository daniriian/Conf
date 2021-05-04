import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  errorMessage: undefined,
  isAuthenticated: undefined,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.AUTHENTICATED_SUCCESS:
    case UserActionTypes.AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

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
        isAuthenticated: true,
      };
    }

    case UserActionTypes.USER_LOG_IN_FAILURE: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    }

    case UserActionTypes.USER_LOG_OUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }

    case UserActionTypes.USER_LOG_OUT_FAIL:
    case UserActionTypes.LOAD_USER_PROFILE_FAIL:
      return state;

    case UserActionTypes.LOAD_USER_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
