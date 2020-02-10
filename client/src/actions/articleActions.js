import axios from "axios";
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
  GET_USER_ARTICLES
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getArticlesPT = () => dispatch => {
  axios
    .get(
      "/api/articles/pt",
      dispatch({
        type: GETTING_ARTICLES
      })
    ) //proxi in the package.json in react makes it not necessary to type the full path
    .then(res =>
      dispatch({
        type: GET_ARTICLES_PT_SUCCESS,
        payload: res.data
      })
    );
};

export const getArticlesEN = () => dispatch => {
  axios
    .get(
      "/api/articles/en",
      dispatch({
        type: GETTING_ARTICLES
      })
    ) //proxi in the package.json in react makes it not necessary to type the full path
    .then(res =>
      dispatch({
        type: GET_ARTICLES_EN_SUCCESS,
        payload: res.data
      })
    );
};

export const getArticle = id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/articles/${id}`,
      dispatch({
        type: GETTING_THE_ARTICLE
      })
    ); //proxi in the package.json in react makes it not necessary to type the full path

    dispatch({
      type: GET_ARTICLE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ARTICLE_FAIL
    });
  }
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
    .post(
      "/api/articles/add",
      bbody,
      tokenConfig(getState),
      dispatch({
        type: ADDING_THE_ARTICLE
      })
    )
    .then(res => {
      window.location.href = `/users/${_id}`; //redirects to the userpage of who posted the article
      dispatch({
        type: ADD_ARTICLE_SUCCESS,
        payload: res.data // this endpoint sends everything, including the token to the auth reducer
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_ARTICLE_FAIL")
      );
      dispatch({
        type: ADD_ARTICLE_FAIL
      });
    });
};
