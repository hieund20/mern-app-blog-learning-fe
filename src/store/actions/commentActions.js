import axiosClient from "../../helpers/axiosClient";

export const getCommentList = (payload) => {
  try {
    return axiosClient.get(`/comments/getAllComments`);
  } catch (err) {
    console.log(err);
  }
};

export const postNewComment = (payload) => {
  try {
    axiosClient.post("/comments/addNewComment", {
      content: payload.content,
      post: payload.postId,
      author: payload.author,
      likeCount: payload.likeCount,
    });
  } catch (err) {
    console.log(err);
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
