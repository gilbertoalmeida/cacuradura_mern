import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  LOGOUT_SUCCESS,
  REGISTERING,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  registering: false,
  isAuthenticated: null,
  isLoading: false,
  loggedUser: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        loggedUser: action.payload
      };
    case REGISTERING:
      return {
        ...state,
        registering: true
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token); //comes from the authActions
      return {
        ...state,
        token: action.payload.token,
        loggedUser: action.payload, // contains the user and the token
        isAuthenticated: true,
        isLoading: false,
        registering: false
      };
    case EDIT_PROFILE_FAIL:
      return {
        ...state
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loggedUser: null,
        isAuthenticated: false,
        isLoading: false,
        registering: false
      };
    default:
      return state;
  }
}
