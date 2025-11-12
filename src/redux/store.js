import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    usersState: usersReducer,
    authState: authReducer,
  },
  devTools: true,
});

export default store;
