import { ParticipantsTypes } from "./participants.types";

const INITIAL_STATE = {
  callers: null, //Lista apelantilor
  consignees: [], //lista destinatarilor
};

const ParticipantsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ParticipantsTypes.GET_CALLERS:
    case ParticipantsTypes.GET_CONSIGNEES:
      return {
        ...state,
        callers: action.payload,
      };
    default:
      return state;
  }
};

export default ParticipantsReducer;
