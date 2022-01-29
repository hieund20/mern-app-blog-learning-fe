import { combineReducers } from "redux";
import { PostListReducer, PostDetailReducer } from "./PostsReducer";
import { TagListReducer } from "./TagsReducer";

const reducers = combineReducers({
  postList: PostListReducer,
  postDetail: PostDetailReducer,
  tagList: TagListReducer,
});

export default reducers;
