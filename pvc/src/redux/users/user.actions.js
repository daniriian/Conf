import UserActionTypes from "./user.types";

import axios from "axios";

export const setCurrentUser = ({ username, password, instanta, csrf }) => {
  return (dispatch, getState) => {
    dispatch(userLogInStarted());

    console.log("current state: ", getState());

    axios
      .post("/users/login/", {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf,
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
        dispatch(userLoginSuccess(res.data));
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
