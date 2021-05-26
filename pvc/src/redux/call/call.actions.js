import { callTypes } from "./call.types";
import Cookies from "js-cookie";
import axios from "axios";

export const setCallStarted = (obj) => ({
  type: callTypes.CALL_STARTED,
  payload: obj,
});

export const callSomebody =
  (caller, somebody) => async (dispatch, getState) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = {
      apelant: caller,
      destinatar: somebody,
      action: getState().call.operation,
    };

    console.log(body.action);

    // if (body.action === "dial") {
    //   dispatch(setCallStarted({ caller: caller, consignee: somebody }));
    // }

    const res = await axios.post("/videoconferinte/call", body, config);

    console.log(res);
  };

export const endCall = () => ({
  type: callTypes.CALL_END,
});
