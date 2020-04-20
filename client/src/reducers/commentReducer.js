import {
  ADDING_THE_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  ADDING_THE_REPLY,
  ADD_REPLY_SUCCESS,
  ADD_REPLY_FAIL,
  GETTING_THE_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL
} from "../actions/types";

const initialState = {
  comments: [],
  loading: false,
  loading_failed: false,
  posting: false,
  posting_failed: false,
  posting_success: false,
  replying: false,
  replying_failed: false,
  replying_success: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDING_THE_COMMENT:
      return {
        ...state,
        posting: true,
        posting_failed: false,
        posting_success: false
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        posting: false,
        posting_success: true,
        comments: [...state.comments, action.payload.newComment]
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        posting: false,
        posting_failed: true,
        posting_success: false
      };
    case ADDING_THE_REPLY:
      return {
        ...state,
        replying: true,
        replying_failed: false,
        replying_success: false
      };
    case ADD_REPLY_SUCCESS:
      return {
        ...state,
        replying: false,
        replying_success: true,
        comments: action.payload
      };
    case ADD_REPLY_FAIL:
      return {
        ...state,
        replying: false,
        replying_failed: true,
        replying_success: false
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
