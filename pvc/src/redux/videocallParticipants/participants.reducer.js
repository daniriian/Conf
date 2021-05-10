import { ParticipantsTypes } from "./participants.types";

const INITIAL_STATE = {
  callers: null, //Lista apelantilor
  consignees: [], //lista destinatarilor
};

const ParticipantsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ParticipantsTypes.GET_CALLERS:
      return {
        ...state,
        callers: action.payload,
      };

    case ParticipantsTypes.GET_CONSIGNEES:
      return {
        ...state,
        consignees: action.payload,
      };
    default:
      return state;
  }
};

export default ParticipantsReducer;
