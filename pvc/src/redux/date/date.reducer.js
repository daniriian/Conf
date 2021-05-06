import { DateActionTypes } from "./date.types";

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
    default: {
      return state;
    }
  }
};

export default dateReducer;
