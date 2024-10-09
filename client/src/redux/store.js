import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import friendReducer from "./features/friendSlice";
import chatReducer from "./features/chatSlice";
import roomReducer from "./features/roomSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    friend: friendReducer,
    chat: chatReducer,
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
