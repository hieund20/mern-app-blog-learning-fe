import axios from "axios";

export const getPostList = (value) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_POST_LIST_LOADING",
    });

    const res = await axios.get(
      `https://mongo-express-learning-api.herokuapp.com/api/posts/getAllPost?page=${value.page}&limit=${value.limit}`
    );

    dispatch({
      type: "GET_POST_LIST_SUCCESS",
      payload: res?.data,
    });
  } catch (err) {
    console.log("error", err);
    dispatch({
      type: "GET_POST_LIST_FAILED",
    });
  }
};

export const getPostDetail = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_POST_DETAIL_LOADING",
    });

    const res = await axios.get(
      `https://mongo-express-learning-api.herokuapp.com/api/posts/getAllPost/${payload._id}`
    );

    dispatch({
      type: "GET_POST_DETAIL_SUCCESS",
      payload: res?.data,
    });
  } catch (err) {
    dispatch({
      type: "GET_POST_DETAIL_FAILED",
    });
  }
};

export const postNewPost = async (payload) => {
  try {
    axios.post(
      "https://mongo-express-learning-api.herokuapp.com/api/posts/addNewPost",
      {
        title: payload.title,
        content: payload.content,
        author: payload.authorId,
        thumbnailImage: payload.thumbnail,
        tags: payload.tags,
      }
    );
  } catch (err) {
    console.log("Error when POST", err);
  }
};

export const updatePost = (payload) => {
  try {
    axios.patch(
      `https://mongo-express-learning-api.herokuapp.com/api/posts/updatePost`,
      {
        _id: payload._id,
        title: payload.title,
        content: payload.content,
        author: payload.authorId,
        thumbnailImage: payload.thumbnail,
        tags: payload.tags,
      }
    );
  } catch (err) {
    console.log("Error when PATCH", err);
  }
};

export const deletePost = (value) => async (dispatch) => {
  try {
    axios
      .delete(
        `https://mongo-express-learning-api.herokuapp.com/api/posts/deletePost/${value._id}`
      )
      .then(() => {
        dispatch({
          type: "DELETE_POST_SUCCESS",
          payload: value?._id,
        });
      });
  } catch (err) {
    console.log("Error when DELETE", err);
  }
};
