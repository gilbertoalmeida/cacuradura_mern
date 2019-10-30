import { GET_ARTICLES } from "../actions/types";

const initialState = {
  articles: [],
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
    default:
      return state;
  }
}
