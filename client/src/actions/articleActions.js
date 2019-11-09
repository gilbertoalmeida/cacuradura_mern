import axios from "axios";
import { GET_ARTICLES, GET_ARTICLE, ADD_ARTICLE } from "./types";

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

//Register User
export const addArticle = ({
  title,
  body,
  author: { username, _id }
}) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body
  const bbody = JSON.stringify({ title, body, author: { username, _id } });

  axios.post("/api/articles/add", bbody, config).then(res =>
    dispatch({
      type: ADD_ARTICLE,
      payload: res.data // this endpoint sends everything, including the token to the auth reducer
    })
  );
};
