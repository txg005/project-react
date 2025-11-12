import {
  setCurrentUser as setCurrentUserSlice,
  logoutUser as logoutUserSlice,
} from "../slices/authSlice";

export const loginUser = (user) => (dispatch) => {
  dispatch(setCurrentUserSlice(user));
};

export const logoutUser = () => (dispatch) => {
  dispatch(logoutUserSlice());
};
