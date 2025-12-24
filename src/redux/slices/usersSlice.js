import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserAPI from "../../api/service";

// actions
export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (user) => {
    return UserAPI.add(user);
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async (id) => {
    UserAPI.delete(id);
    return id;
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async (user) => {
    UserAPI.update(user);
    return user;
  }
);

// slices
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: UserAPI.all(),
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // add
      .addCase(addUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // delete
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // update
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
