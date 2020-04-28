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
  EDITING_THE_ARTICLE,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_FAIL,
  GETTING_USER_ARTICLES,
  GET_USER_ARTICLES_SUCCESS,
  GET_USER_ARTICLES_FAIL
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

export const getUserArticles = username => async dispatch => {
  try {
    const res = await axios.get(
      `/api/articles/user/${username}`,
      dispatch({
        type: GETTING_USER_ARTICLES
      })
    ); //proxi in the package.json in react makes it not necessary to type the full path
    dispatch({
      type: GET_USER_ARTICLES_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USER_ARTICLES_FAIL
    });
  }
};

export const addArticle = ({
  title,
  body,
  language,
  coverImg,
  author: { username, _id }
}) => (dispatch, getState) => {
  //Request body
  const bbody = JSON.stringify({
    title,
    body,
    language,
    coverImg,
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
      window.location.href = `/users/${username}`; //redirects to the userpage of who posted the article
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

export const editArticle = (title, body, coverImg, articleID, username) => (
  dispatch,
  getState
) => {
  //Request body
  const bbody = JSON.stringify({
    title,
    body,
    coverImg
  });

  axios
    .patch(
      `/api/articles/edit/${articleID}`,
      bbody,
      tokenConfig(getState),
      dispatch({
        type: EDITING_THE_ARTICLE
      })
    )
    .then(res => {
      window.location.href = `/users/${username}`; //redirects to the userpage of who posted the article
      dispatch({
        type: EDIT_ARTICLE_SUCCESS,
        payload: res.data // this endpoint sends everything, including the token to the auth reducer
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_ARTICLE_FAIL")
      );
      dispatch({
        type: EDIT_ARTICLE_FAIL
      });
    });
};
