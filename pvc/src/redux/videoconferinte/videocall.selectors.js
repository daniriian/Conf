import { createSelector } from "reselect";

const selectVideoCalls = (state) => state.videoCalls;

export const selectVideoCallsList = createSelector(
  [selectVideoCalls],
  (videoCalls) => videoCalls.videoCallsList
);

export const selectAddDialogStatus = createSelector(
  [selectVideoCalls],
  (videoCalls) => videoCalls.showAddVideocallDialog
);
