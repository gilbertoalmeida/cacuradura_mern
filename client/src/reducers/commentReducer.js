import {
  ADDING_THE_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL
} from "../actions/types";

const initialState = {
  posting: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDING_THE_COMMENT:
      return {
        ...state,
        posting: true
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        posting: false
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        posting: false
      };
    default:
      return state;
  }
}
