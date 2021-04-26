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
        dispatch(getSession(csrfToken));
      })
      .catch((err) => console.log(err));
  };
};

export const getSessionAsync = () => {
  return (dispatch) => {
    console.log("Fetching users/session");
    fetch("/users/session/", {
      credentials: "same-origin",
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.utilizator) {
          console.log("Dispatching userLoginSuccess");
          dispatch(userLoginSuccess(data));
        } else {
          console.log("Dispatching getCsrf");
          dispatch(getCsrf());
        }
      })
      .catch((err) => console.log(err));
  };
};
