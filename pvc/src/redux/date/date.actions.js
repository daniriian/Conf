import { DateActionTypes } from "./date.types";

export const setSelectedDate = (date) => ({
  type: DateActionTypes.SET_SELECTED_DATE,
  payload: date,
});
