import axios from "axios";
import { GET_ARTICLES } from "./types";

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
