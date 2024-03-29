import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  EDITING_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  LOGOUT_SUCCESS,
  REGISTERING,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

//Check token and load user
export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register User
export const register = ({ username, password }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body
  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post(
      "/api/auth/register",
      body,
      config,
      dispatch({
        type: REGISTERING
      })
    );
    dispatch(clearErrors());
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
    );
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = ({ username, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data //everything, including the token to the auth reducer
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//Edit User Profile
export const editProfile = (username, profilePicsArray, id) => async (
  dispatch,
  getState
) => {
  //Request body
  const body = JSON.stringify({ id, username, profilePicsArray });

  try {
    const res = await axios.patch(
      "/api/auth/edit",
      body,
      tokenConfig(getState),
      dispatch({
        type: EDITING_PROFILE
      })
    );
    dispatch(clearErrors());
    window.location.href = `/users/${username}`; //redirects to the userpage of who posted the article
    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "EDIT_PROFILE_FAIL")
    );
    dispatch({
      type: EDIT_PROFILE_FAIL
    });
  }
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

//Setup config/headers and token
export const tokenConfig = getState => {
  //Get token from localstore
  const token = getState().auth.token;

  //token to headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
