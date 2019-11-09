import axios from "axios";
import { GET_USER } from "./types";

export const getUser = id => dispatch => {
  axios
    .get(`/api/users/${id}`) //proxi in the package.json in react makes it not necessary to type the full path
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    );
};
