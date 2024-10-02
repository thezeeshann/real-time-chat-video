import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  onlineUsers: [],
  pendingFriends: [],
};

export const friendSlice = createSlice({
  name: "friend",
  initialState: initialState,
  reducers: {
    setFriends(state, action) {
      state.friends = action.payload;
    },
    pendingFriendsInvitations(state, action) {
      state.pendingFriends = action.payload;
    },
    onlineFriends(state, action) {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setFriends, pendingFriendsInvitations, onlineFriends } =
  friendSlice.actions;
export default friendSlice.reducer;
