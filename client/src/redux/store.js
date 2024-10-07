import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import friendReducer from "./features/friendSlice";
import chatReducer from "./features/chatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    friend: friendReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export default store;
