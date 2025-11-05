import { ADD_USER, DELETE_USER, UPDATE_USER } from "../actions/actionTypes";
import UserAPI from "../../api/service";

const initialState = {
  users: UserAPI.all(),
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      const newUser = UserAPI.add(action.payload);
      return { ...state, users: [...state.users, newUser] };
    }

    case DELETE_USER: {
      UserAPI.delete(action.payload);
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
    }

    case UPDATE_USER: {
      UserAPI.update(action.payload);
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
      };
    }

    default:
      return state;
  }
}
