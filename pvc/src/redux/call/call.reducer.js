import { callTypes } from "./call.types";

const INITIAL_STATE = {
  call_started: false,
  call_established: false,
  caller: null,
  consignee: null,
  operation: "",
};

const callReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case callTypes.CALL_STARTED:
      return {
        ...state,
        call_started: true,
        caller: action.payload.caller,
        consignee: action.payload.consignee,
        operation: "dial",
      };

    case callTypes.CALL_ESTABLISHED:
      return {
        ...state,
        call_established: true,
      };
    case callTypes.CALL_FAIL:
    case callTypes.CALL_END:
      return {
        ...state,
        call_started: false,
        call_established: false,
        operation: "hang-up",
      };

    default:
      return state;
  }
};

export default callReducer;
