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

export const selectShowDeleteDialog = createSelector(
  [selectVideoCalls],
  (videocalls) => videocalls.showDeleteDialog
);

export const selectCurrentVideocall = createSelector(
  [selectVideoCalls],
  (videocalls) => videocalls.selectedVideocall
);

export const selectDialogMode = createSelector(
  [selectVideoCalls],
  (videocalls) => videocalls.dialogMode
);
