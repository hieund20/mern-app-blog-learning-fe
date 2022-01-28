import { combineReducers } from "redux";
import {PostListReducer, PostDetailReducer} from "./PostsReducer";

const reducers = combineReducers({
  postList: PostListReducer,
  postDetail: PostDetailReducer
});

export default reducers;
