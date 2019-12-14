import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { localizeReducer } from "react-localize-redux";

export default combineReducers({
  localize: localizeReducer,
  article: articleReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer
});
