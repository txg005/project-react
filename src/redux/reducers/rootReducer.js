import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  usersState: usersReducer,
  authState: authReducer,
});

export default rootReducer;
