import { SET_CURRENT_USER, LOGOUT_USER } from "../actions/actionTypes";

const savedUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const initialState = {
  currentUser: savedUser,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case LOGOUT_USER:
      localStorage.removeItem("currentUser");
      return { ...state, currentUser: null };

    default:
      return state;
  }
}
