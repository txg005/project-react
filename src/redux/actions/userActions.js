import {
  addUser as addUserSlice,
  deleteUser as deleteUserSlice,
  updateUser as updateUserSlice,
} from "../slices/usersSlice";

export const addUser = (user) => (dispatch) => {
  dispatch(addUserSlice(user));
};

export const deleteUser = (id) => (dispatch) => {
  dispatch(deleteUserSlice(id));
};

export const updateUser = (user) => (dispatch) => {
  dispatch(updateUserSlice(user));
};
