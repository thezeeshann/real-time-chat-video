import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
};

export const roomSlice = createSlice({
  initialState: initialState,
  name: "room",
  reducers: {
    openRoom(state, action) {
      state.isUserInRoom = action.payload.isUserInRoom;
      state.isUserRoomCreator = action.payload.isUserRoomCreator;
    },
  },
});

export const { openRoom } = roomSlice.actions;
export default roomSlice.reducer;
