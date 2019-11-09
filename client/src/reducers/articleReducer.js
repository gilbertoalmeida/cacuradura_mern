import { GET_ARTICLES, GET_ARTICLE, ADD_ARTICLE } from "../actions/types";

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
    case ADD_ARTICLE:
      return {
        ...state,
        article: action.payload
      };
    default:
      return state;
  }
}
