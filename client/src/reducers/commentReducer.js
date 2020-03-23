import {
  ADDING_THE_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL
} from "../actions/types";

const initialState = {
  posting: false,
  posting_failed: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDING_THE_COMMENT:
      return {
        ...state,
        posting: true,
        posting_failed: false
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        posting: false
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        posting: false,
        posting_failed: true
      };
    default:
      return state;
  }
}
