import { combineReducers } from "redux";
import PostsReducer from "./PostsReducer";

const reducers = combineReducers({
  postList: PostsReducer,
});

export default reducers;
