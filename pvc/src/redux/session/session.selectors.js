import { createSelector } from "reselect";

const sessionSelector = (state) => state.session;

export const selectSession = createSelector(
  [sessionSelector],
  (session) => session.csrfToken
);
