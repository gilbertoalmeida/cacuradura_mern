import axios from "axios";
import { GETTING_THE_USER, GET_USER_SUCCESS, GET_USER_FAIL } from "./types";

export const getUser = id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/users/${id}`,
      dispatch({
        type: GETTING_THE_USER
      })
    );

    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USER_FAIL
    });
  }
};
