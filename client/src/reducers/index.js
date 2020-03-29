import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";
import { localizeReducer } from "react-localize-redux";

export default combineReducers({
  localize: localizeReducer,
  article: articleReducer,
  comment: commentReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer
});
