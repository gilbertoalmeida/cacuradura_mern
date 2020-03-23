import axios from "axios";
import {
  ADDING_THE_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const addComment = ({
  articleID,
  author: { username, _id },
  comment
}) => (dispatch, getState) => {
  //Request body
  const bbody = JSON.stringify({
    articleID,
    author: { username, _id },
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
      /* window.location.href = `/users/${_id}`; */ //redirects to the userpage of who posted the article
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
