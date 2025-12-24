import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// actions
export const loginUserAsync = createAsyncThunk(
  "auth/loginUserAsync",
  async (user, { rejectWithValue }) => {
    await new Promise((res) => setTimeout(res, 300));

    if (!user) {
      return rejectWithValue("Invalid credentials");
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  }
);

export const logoutUserAsync = createAsyncThunk(
  "auth/logoutUserAsync",
  async () => {
    await new Promise((res) => setTimeout(res, 300));
    localStorage.removeItem("currentUser");
    return null;
  }
);

// slices
const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: savedUser,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // login
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // logout
      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      });
  },
});

export default authSlice.reducer;
