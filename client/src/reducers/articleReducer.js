<<<<<<< HEAD
import {
  GET_ARTICLES,
  GET_ARTICLE,
  ADD_ARTICLE_SUCCESS,
  ADD_ARTICLE_FAIL
} from "../actions/types";
=======
import { GET_ARTICLES, GET_ARTICLE, GET_USER_ARTICLES } from "../actions/types";
>>>>>>> c0d85951ad6b52c3105eea4ad6448390bbefae3e

const initialState = {
  articles: [],
  article: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
        loading: false
      };
<<<<<<< HEAD
    case ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload
      };
    case ADD_ARTICLE_FAIL:
      return {
        ...state,
        article: null
=======
    case GET_USER_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        loading: false
>>>>>>> c0d85951ad6b52c3105eea4ad6448390bbefae3e
      };
    default:
      return state;
  }
}
