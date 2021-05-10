import { createSelector } from "reselect";

const selectParticipants = (state) => state.participants;

export const selectCallers = createSelector(
  [selectParticipants],
  (participants) => participants.callers
);

export const selectConsignees = createSelector(
  [selectParticipants],
  (participants) => participants.consignees
);
