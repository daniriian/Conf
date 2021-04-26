import { DateActionTypes } from "./date.types";

export const setSelectedDate = (date) => ({
  action: DateActionTypes.SET_SELECTED_DATE,
  payload: date,
});
