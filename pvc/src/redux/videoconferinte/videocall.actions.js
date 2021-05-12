import { VideoCallTypes } from "./videocall.types";
import { format_date } from "../../utils/index";
import Cookies from "js-cookie";
import axios from "axios";

export const addVidecall = (videocall) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  videocall.data = format_date(videocall.data).yyyymmdd;
  console.log(videocall);

  let body = JSON.stringify(videocall);

  let res = await axios.post("/videoconferinte/adauga", body, config);
  console.log(res);

  if (res.data.success) {
    dispatch({
      type: VideoCallTypes.ADD_VIDEOCONFERENCE_SUCCESS,
      payload: res.data.success,
    });
  } else {
    dispatch({
      type: VideoCallTypes.ADD_VIDEOCONFERENCE_FAIL,
      payload: res.data.error,
    });
  }
};

export const getVideoConferenceListByDate = (date) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  let formatted_date = format_date(date).yyyymmdd;

  try {
    const res = await axios.post(
      "/videoconferinte/vc",
      { data: formatted_date },
      config
    );

    if (res.data.error) {
      console.log("Error");
      dispatch({
        type: VideoCallTypes.GET_VIDEOCONFERENCES_BY_DATE_FAIL,
        payload: [],
      });
    } else {
      dispatch({
        type: VideoCallTypes.GET_VIDEOCONFERENCES_BY_DATE_SUCCESS,
        payload: res.data.vc_list,
      });
    }
  } catch (err) {
    dispatch({
      type: VideoCallTypes.GET_VIDEOCONFERENCES_BY_DATE_FAIL,
      payload: [],
    });
  }
};
