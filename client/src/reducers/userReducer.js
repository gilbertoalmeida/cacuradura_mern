import {
  GETTING_THE_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL
} from "../actions/types";

const initialState = {
  loadedUser: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_THE_USER:
      return {
        ...state,
        loadedUser: null,
        loading: true
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loadedUser: action.payload,
        loading: false
      };
    case GET_USER_FAIL:
      return {
        ...state,
        loadedUser: null,
        loading: false
      };
    default:
      return state;
  }
}
