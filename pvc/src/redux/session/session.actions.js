import { SessionActionTypes } from "./session.types";

import { userLoginSuccess } from "../users/user.actions";

export const getSession = (csrf) => ({
  type: SessionActionTypes.GET_SESSION,
  payload: csrf,
});

export const getCsrf = () => {
  return (dispatch) => {
    fetch("/users/csrf/", {
      credentials: "same-origin",
    })
      .then((res) => {
        let csrfToken = res.headers.get("X-CSRFToken");
        console.log("Dispatching getSession()");
        dispatch(getSession(csrfToken));
        console.log(csrfToken);
      })
      .catch((err) => console.log(err));
  };
};

export const getSessionAsync = () => {
  return (dispatch) => {
    fetch("/users/session/", {
      credentials: "same-origin",
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data.isAuthenticated) {
          dispatch(userLoginSuccess(data.username));
        } else {
          console.log("gfdsgdf");
          dispatch(getCsrf());
        }
      })
      .catch((err) => console.log(err));
  };
};
