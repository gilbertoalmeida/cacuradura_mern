import {
  GETTING_ARTICLES,
  GET_ARTICLES_PT_SUCCESS,
  GET_ARTICLES_EN_SUCCESS,
  GETTING_THE_ARTICLE,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_FAIL,
  ADDING_THE_ARTICLE,
  ADD_ARTICLE_SUCCESS,
  ADD_ARTICLE_FAIL,
  ADDING_THE_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  GET_USER_ARTICLES
} from "../actions/types";

const initialState = {
  articles: [],
  article: null,
  loading: false,
  posting: false,
  posting_comment: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_ARTICLES:
      return {
        ...state,
        loading: true
      };
    case GET_ARTICLES_PT_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    case GET_ARTICLES_EN_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    case GETTING_THE_ARTICLE:
      return {
        ...state,
        loading: true
      };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        loading: false
      };
    case GET_ARTICLE_FAIL:
      return {
        ...state,
        loading: false
      };
    case ADDING_THE_ARTICLE:
      return {
        ...state,
        posting: true
      };
    case ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        posting: false
      };
    case ADD_ARTICLE_FAIL:
      return {
        ...state,
        article: null,
        posting: false
      };
    case ADDING_THE_COMMENT:
      return {
        ...state,
        posting_comment: true
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        posting_comment: false
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        posting_comment: false
      };
    case GET_USER_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
