import axios from "axios";
import {
  GET_ARTICLES_PT,
  GET_ARTICLES_EN,
  GET_ARTICLE,
  ADD_ARTICLE_SUCCESS,
  ADD_ARTICLE_FAIL,
  GET_USER_ARTICLES
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getArticlesPT = () => dispatch => {
  axios
    .get("/api/articles/pt") //proxi in the package.json in react makes it not necessary to type the full path
    .then(res =>
      dispatch({
        type: GET_ARTICLES_PT,
        payload: res.data
      })
    );
};

export const getArticlesEN = () => dispatch => {
  axios
    .get("/api/articles/en") //proxi in the package.json in react makes it not necessary to type the full path
    .then(res =>
      dispatch({
        type: GET_ARTICLES_EN,
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

export const addArticle = ({
  title,
  body,
  language,
  feed_img,
  author: { username, _id }
}) => (dispatch, getState) => {
  //Request body
  const bbody = JSON.stringify({
    title,
    body,
    language,
    feed_img,
    author: { username, _id }
  });

  axios
    .post("/api/articles/add", bbody, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ARTICLE_SUCCESS,
        payload: res.data // this endpoint sends everything, including the token to the auth reducer
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_ARTICLE_FAIL")
      );
      dispatch({
        type: ADD_ARTICLE_FAIL
      });
    });
};
