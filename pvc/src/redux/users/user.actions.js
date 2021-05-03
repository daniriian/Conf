import UserActionTypes from "./user.types";
import Cookies from "js-cookie";
import axios from "axios";

export const setCurrentUser = (instanta, username, password) => {
  return (dispatch) => {
    dispatch(userLogInStarted());

    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({
        username: username,
        password: password,
        instanta: instanta,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(userLoginSuccess(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(userLogInFailure(err));
      });
  };
};

export const userLogInStarted = () => ({
  type: UserActionTypes.START_USER_LOG_IN,
});

export const userLoginSuccess = (user) => ({
  type: UserActionTypes.USER_LOG_IN_SUCCESS,
  payload: user,
});

export const userLogInFailure = (err) => ({
  type: UserActionTypes.USER_LOG_IN_FAILURE,
  payload: err,
});

export const userLogOut = () => ({
  type: UserActionTypes.LOG_USER_OUT,
});

export const userLogOutAsync = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  const body = JSON.stringify({
    withCredentials: true,
  });

  try {
    const res = await axios.post("/users/logout", body, config);

    if (res.data.error) {
      dispatch({
        type: UserActionTypes.USER_LOG_OUT_FAIL,
      });
    } else {
      dispatch({
        type: UserActionTypes.USER_LOG_OUT_SUCCESS,
      });
    }
  } catch (err) {
    dispatch({
      type: UserActionTypes.USER_LOG_OUT_FAIL,
    });
  }
};

export const checkAuthenticated = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("/users/authenticated", config);

    if (res.data.error || res.data.isAuthenticated === "error") {
      dispatch({
        type: UserActionTypes.AUTHENTICATED_FAIL,
        payload: false,
      });
    } else if (res.data.isAuthenticated === "success") {
      dispatch({
        type: UserActionTypes.AUTHENTICATED_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: UserActionTypes.AUTHENTICATED_FAIL,
        payload: false,
      });
    }
  } catch (err) {
    dispatch({
      type: UserActionTypes.AUTHENTICATED_FAIL,
      payload: false,
    });
  }
};
