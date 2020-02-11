import { GET_USER } from "../actions/types";

const initialState = {
  loadedUser: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loadedUser: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
