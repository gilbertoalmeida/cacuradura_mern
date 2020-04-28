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
  EDITING_THE_ARTICLE,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_FAIL,
  GETTING_USER_ARTICLES,
  GET_USER_ARTICLES_SUCCESS,
  GET_USER_ARTICLES_FAIL
} from "../actions/types";

const initialState = {
  articles: null,
  article: null,
  loading: false,
  posting: false,
  posting_failed: false,
  editing: false,
  editing_failed: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_ARTICLES:
      return {
        ...state,
        articles: null,
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
        article: null,
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
        posting: true,
        posting_failed: false
      };
    case ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        posting_failed: false
      };
    case ADD_ARTICLE_FAIL:
      return {
        ...state,
        article: null,
        posting: false,
        posting_failed: true
      };
    case EDITING_THE_ARTICLE:
      return {
        ...state,
        editing: true,
        editing_failed: false
      };
    case EDIT_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        editing_failed: false
      };
    case EDIT_ARTICLE_FAIL:
      return {
        ...state,
        editing: false,
        editing_failed: true
      };
    case GETTING_USER_ARTICLES:
      return {
        ...state,
        articles: null,
        loading: true
      };
    case GET_USER_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    case GET_USER_ARTICLES_FAIL:
      return {
        ...state,
        articles: null,
        loading: false
      };
    default:
      return state;
  }
}
