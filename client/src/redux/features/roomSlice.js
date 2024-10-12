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
    setRoomDetails(state, action) {
      state.roomDetails = action.payload;
    },
    setActiveRooms(state, action) {
      state.activeRooms = action.payload;
    },
  },
});

export const { openRoom, setRoomDetails, setActiveRooms } = roomSlice.actions;
export default roomSlice.reducer;
