import axios from "axios";
import {
  GET_ARTICLES,
  GET_ARTICLE,
  ADD_ARTICLE_SUCCESS,
  ADD_ARTICLE_FAIL,
  GET_USER_ARTICLES
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

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

export const addArticle = ({ title, body, author: { username, _id } }) => (
  dispatch,
  getState
) => {
  //Request body
  const bbody = JSON.stringify({ title, body, author: { username, _id } });

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
