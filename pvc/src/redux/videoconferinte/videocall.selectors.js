import { createSelector } from "reselect";

const selectVideoCalls = (state) => state.videoCalls;

export const selectVideoCallsList = createSelector(
  [selectVideoCalls],
  (videoCalls) => videoCalls.videoCallsList
);
