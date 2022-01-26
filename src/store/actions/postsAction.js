import axios from "axios";

export const getPostList = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_POST_LIST_LOADING",
    });

    const res = await axios.get(
      "https://mongo-express-learning-api.herokuapp.com/api/posts"
    );

    dispatch({
      type: "GET_POST_LIST_SUCCESS",
      payload: res?.data,
    });
  } catch (err) {
    dispatch({
      type: "GET_POST_LIST_FAILED",
    });
  }
};
