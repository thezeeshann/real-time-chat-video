import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import friendReducer from "./features/friendSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    friend: friendReducer,
  },
});

export default store;
