import axios from "axios";
import { ParticipantsTypes } from "./participants.types";

export const getCallersList = () => async (dispatch) => {
  const res = await axios.get("videoconferinte/callers");
  console.log(res);
  if (res.data.success) {
    dispatch({ type: ParticipantsTypes.GET_CALLERS, payload: res.callersList });
  }
};
export const getConsegneeSList = () => {};
