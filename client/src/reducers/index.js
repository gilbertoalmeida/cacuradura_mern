import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

export default combineReducers({
  article: articleReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer
});
