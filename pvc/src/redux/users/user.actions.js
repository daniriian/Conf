import UserActionTypes from "./user.types";

export const setCurrentUser = (username, password, instanta, csrf) => {
  return (dispatch) => {
    dispatch(userLogInStarted());

    fetch("/users/login/", {
      method: "POST",
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
        return res.json();
      })
      .then((data) => dispatch(userLoginSuccess(data)))
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

export const userLogOutAsync = () => {
  return (dispatch) => {
    fetch("/users/logout", {
      credentials: "same-origin",
    })
      .then(() => dispatch(userLogOut()))
      .catch((err) => {
        console.log(err);
      });
  };
};
