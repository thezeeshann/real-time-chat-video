import { createSlice } from "@reduxjs/toolkit";

export const chatTypes = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
};

const initialState = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setMessage(state, action) {
      state.messages = action.payload;
    },
    setChatType(state, action) {
      state.chatType = action.payload;
    },
    setChosenChatDetails(state, action) {
      state.chosenChatDetails = action.payload.details;
      state.chatType = action.payload.chatType;
    },
  },
});

export const { setMessage, setChatType, setChosenChatDetails } =
  chatSlice.actions;
export default chatSlice.reducer;
