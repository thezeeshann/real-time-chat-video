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
    friends(state, action) {
      state.friends = action.payload;
    },
    pendingFriends(state, action) {
      state.pendingFriends = action.payload;
    },
    onlineFriends(state, action) {
      state.pendingFriends = action.payload;
    },
  },
});

export const { friends, pendingFriends, onlineFriends } = friendSlice.actions;
export default friendSlice.reducer;
