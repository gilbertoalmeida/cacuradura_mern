import {
  ADDING_THE_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  GETTING_THE_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL
} from "../actions/types";

const initialState = {
  comments: [],
  loading: false,
  loading_failed: false,
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
        posting: false,
        comments: [...state.comments, action.payload.newComment]
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        posting: false,
        posting_failed: true
      };
    case GETTING_THE_COMMENTS:
      return {
        ...state,
        loading: true
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case GET_COMMENTS_FAIL:
      return {
        ...state,
        loading: false,
        loading_failed: true
      };
    default:
      return state;
  }
}
