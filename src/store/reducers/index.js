import { combineReducers } from "redux";
import { PostListReducer, PostDetailReducer } from "./PostsReducer";
import { TagListReducer } from "./TagsReducer";
import { UsersReducer } from "./UsersReducer";
import CommentReducer from "./CommentsReducer";

const reducers = combineReducers({
  postList: PostListReducer,
  postDetail: PostDetailReducer,
  tagList: TagListReducer,
  commentList: CommentReducer,
  myData: UsersReducer,
});

export default reducers;
