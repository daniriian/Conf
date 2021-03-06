import { VideoCallTypes } from "./videocall.types";
import { format_date } from "../../utils/index";
import Cookies from "js-cookie";
import axios from "axios";

export const addVidecall = (videocall) => async (dispatch, getState) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  let formated_videocall = {
    ...videocall,
    data: format_date(videocall.data).yyyymmdd,
  };

  let body = JSON.stringify(formated_videocall);

  let res = await axios.post("/videoconferinte/adauga", body, config);
  console.log(res);

  if (res.data.success) {
    dispatch({
      type: VideoCallTypes.ADD_VIDEOCONFERENCE_SUCCESS,
      payload: { message: res.data.success, data: videocall.data },
    });
    dispatch(getVideoConferenceListByDate(getState().selectedDate.date));
  } else {
    dispatch({
      type: VideoCallTypes.ADD_VIDEOCONFERENCE_FAIL,
      payload: res.data.error,
    });
  }
};

export const editVideocallStarted = () => ({
  type: VideoCallTypes.EDIT_VIDEOCALL_STARTED,
});

export const editVideocallSuccess = () => ({
  type: VideoCallTypes.EDIT_VIDEOCALL_SUCCESS,
});

export const editVideocallFail = () => ({
  type: VideoCallTypes.EDIT_VIDEOCALL_FAIL,
});

export const editVideocall = (videocall) => async (dispatch, getState) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  console.log(videocall);

  const body = JSON.stringify({
    ...videocall,
    // data: format_date(videocall.data).yyyymmdd,
    withCredentials: true,
  });

  const res = await axios.put(
    "/videoconferinte/edit/" + videocall.id,
    body,
    config
  );

  console.log(res);

  if (res.data.success) {
    dispatch(editVideocallSuccess());
    dispatch(getVideoConferenceListByDate(getState().selectedDate.date));
  } else {
    dispatch(editVideocallFail());
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

  console.log(date);

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

export const addVideocallStarted = () => ({
  type: VideoCallTypes.ADD_VIDEOCONFERENCE_STARTED,
});

export const addVideocallSuccess = () => ({
  type: VideoCallTypes.ADD_VIDEOCONFERENCE_SUCCESS,
});

export const addVideocallFail = () => ({
  type: VideoCallTypes.ADD_VIDEOCONFERENCE_FAIL,
});

export const deleteVideocallStarted = () => ({
  type: VideoCallTypes.DELETE_VIDEOCONFERENCE_STARTED,
  payload: true,
});

export const deleteVideocallSuccess = () => ({
  type: VideoCallTypes.DELETE_VIDEOCONFERENCE_SUCCESS,
  payload: false,
});

export const deleteVideocallFail = () => ({
  type: VideoCallTypes.DELETE_VIDEOCONFERENCE_FAIL,
  payload: false,
});

export const deleteVideocall = (id) => async (dispatch, getState) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  let res = await axios.delete("/videoconferinte/delete/" + id, config);

  if (res.data.success) {
    console.log(res);

    dispatch(unMarkVideoCall());
    dispatch(getVideoConferenceListByDate(getState().selectedDate.date));
    dispatch(deleteVideocallSuccess());
  } else {
    console.log("Eroare la stergerea videoconferintei", res.data.error);
    deleteVideocallFail();
  }
};

export const approveVideocallDelete = () => ({
  type: VideoCallTypes.APPROVE_VIDEOCONFERENCE_DELETE,
  payload: true,
});

export const denyVideocallDelete = () => ({
  type: VideoCallTypes.DENY_VIDEOCONFERENCE_DELETE,
  payload: false,
});

export const markVideoCall = (id) => ({
  type: VideoCallTypes.MARK_VIDEOCALL,
  payload: id,
});

export const unMarkVideoCall = () => ({
  type: VideoCallTypes.UNMARK_VIDEOCALL,
  payload: null,
});
