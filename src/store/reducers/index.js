import { combineReducers } from "redux";
import { PostListReducer, PostDetailReducer } from "./PostsReducer";
import { TagListReducer } from "./TagsReducer";
import CommentReducer from "./CommentsReducer";

const reducers = combineReducers({
  postList: PostListReducer,
  postDetail: PostDetailReducer,
  tagList: TagListReducer,
  commentList: CommentReducer,
});

export default reducers;
