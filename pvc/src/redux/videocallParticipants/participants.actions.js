import axios from "axios";
import { ParticipantsTypes } from "./participants.types";

export const getCallersList = () => async (dispatch) => {
  const res = await axios.get("videoconferinte/callers");
  if (res.data.success) {
    dispatch({
      type: ParticipantsTypes.GET_CALLERS,
      payload: res.data.callersList,
    });
  }
};
export const getConsigneesList = () => async (dispatch) => {
  const res = await axios.get("videoconferinte/terminals");
  if (res.data.success) {
    dispatch({
      type: ParticipantsTypes.GET_CONSIGNEES,
      payload: res.data.terminalsList,
    });
  }
};
