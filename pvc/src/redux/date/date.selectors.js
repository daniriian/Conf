import { createSelector } from "reselect";

const dateSelector = (state) => state.selectedDate;

export const selectPickedDate = createSelector(
  [dateSelector],
  (selectedDate) => selectedDate.date
);
