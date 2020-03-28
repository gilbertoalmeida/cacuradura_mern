import axios from "axios";
import {
  ADDING_THE_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  GETTING_THE_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const addComment = ({
  articleID,
  author: { username, _id, picture },
  comment
}) => (dispatch, getState) => {
  //Request body
  const bbody = JSON.stringify({
    articleID,
    author: { username, _id, picture },
    comment
  });

  axios
    .post(
      "/api/comments/add",
      bbody,
      tokenConfig(getState),
      dispatch({
        type: ADDING_THE_COMMENT
      })
    )
    .then(res => {
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: res.data // this endpoint sends everything, including the token to the auth reducer
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_COMMENT_FAIL")
      );
      dispatch({
        type: ADD_COMMENT_FAIL
      });
    });
};

export const getComments = id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/comments/${id}`,
      dispatch({
        type: GETTING_THE_COMMENTS
      })
    ); //proxi in the package.json in react makes it not necessary to type the full path
    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_COMMENTS_FAIL
    });
  }
};
