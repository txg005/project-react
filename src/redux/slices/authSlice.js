import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: savedUser,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { setCurrentUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
