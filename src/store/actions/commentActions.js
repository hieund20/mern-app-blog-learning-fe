import axios from "axios";

export const getCommentList = (value) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_COMMENT_LIST_LOADING",
    });

    await axios
      .get(
        `https://mongo-express-learning-api.herokuapp.com/api/comments/getAllComments?page=${value.page}&limit=${value.limit}`
      )
      .then((res) => {
        dispatch({
          type: "GET_COMMENT_LIST_SUCCESS",
          payload: res?.data,
        });
      });
  } catch (err) {
    dispatch({
      type: "GET_COMMENT_LIST_FAILED",
    });
  }
};

export const postNewComment = (value) => async (dispatch) => {
  try {
    dispatch({
      type: "POST_COMMENT_LOADING",
    });

    axios
      .post(
        "https://mongo-express-learning-api.herokuapp.com/api/comments/addNewComment",
        {
          content: value.content,
          post: value.postId,
          author: value.author,
          likeCount: value.likeCount,
        }
      )
      .then((res) => {
        dispatch({ type: "POST_COMMENT_SUCCESS", payload: res?.data });
      });
  } catch (err) {
    dispatch({ type: "POST_COMMENT_FAILED" });
  }
};

export const deleteTag = (value) => async (dispatch) => {
  try {
    axios
      .delete(
        `https://mongo-express-learning-api.herokuapp.com/api/tags/deleteTag/${value._id}`
      )
      .then(() => {
        dispatch({
          type: "DELETE_TAG_SUCCESS",
          payload: value?._id,
        });
      });
  } catch (err) {
    console.log("Error when DELETE", err);
  }
};
