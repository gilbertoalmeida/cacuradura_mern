import axios from "axios";
import { GET_ARTICLES, GET_ARTICLE, GET_USER_ARTICLES } from "./types";

export const getArticles = () => dispatch => {
  axios
    .get("/api/articles") //proxi in the package.json in react makes it not necessary to type the full path
    .then(res =>
      dispatch({
        type: GET_ARTICLES,
        payload: res.data
      })
    );
};

export const getArticle = id => dispatch => {
  axios
    .get(`/api/articles/${id}`) //proxi in the package.json in react makes it not necessary to type the full path
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data
      })
    );
};

export const getUserArticles = id => dispatch => {
  axios.get(`/api/articles/user/${id}`).then(res =>
    dispatch({
      type: GET_USER_ARTICLES,
      payload: res.data
    })
  );
};
