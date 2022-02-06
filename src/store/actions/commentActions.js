import axiosClient from "../../helpers/axiosClient";

export const getCommentList = (payload) => {
  try {
    return axiosClient.get(
      `/comments/getAllComments?page=${payload.page}&limit=${payload.limit}`
    );
  } catch (err) {
    console.log(err);
  }
};

export const postNewComment = (value) => async (dispatch) => {
  try {
    dispatch({
      type: "POST_COMMENT_LOADING",
    });

    axiosClient
      .post("/comments/addNewComment", {
        content: value.content,
        post: value.postId,
        author: value.author,
        likeCount: value.likeCount,
      })
      .then((res) => {
        dispatch({ type: "POST_COMMENT_SUCCESS", payload: res });
      });
  } catch (err) {
    dispatch({ type: "POST_COMMENT_FAILED" });
  }
};

// export const deleteTag = (value) => async (dispatch) => {
//   try {
//     axiosClient.delete(`/tags/deleteTag/${value._id}`).then(() => {
//       dispatch({
//         type: "DELETE_TAG_SUCCESS",
//         payload: value?._id,
//       });
//     });
//   } catch (err) {
//     console.log("Error when DELETE", err);
//   }
// };
