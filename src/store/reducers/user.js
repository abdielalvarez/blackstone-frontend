import { CREATE_USER, LOGIN_USER } from "../actions/user";

const initialState = {
  user: null
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.data
      }
    case LOGIN_USER:
      return {
        ...state,
        user: action.data
      }
    default:
      return state;
  }
}