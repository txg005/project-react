import { createSlice } from "@reduxjs/toolkit";
import UserAPI from "../../api/service";

const initialState = {
  users: UserAPI.all(),
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = UserAPI.add(action.payload);
      state.users.push(newUser);
    },
    deleteUser: (state, action) => {
      UserAPI.delete(action.payload);
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    updateUser: (state, action) => {
      UserAPI.update(action.payload);
      state.users = state.users.map((u) =>
        u.id === action.payload.id ? action.payload : u
      );
    },
  },
});

export const { addUser, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
