import axios from "axios";

export const getTagList = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_TAG_LIST_LOADING",
    });

    await axios
      .get(
        "https://mongo-express-learning-api.herokuapp.com/api/tags/getAllTags"
      )
      .then((res) => {
        dispatch({
          type: "GET_TAG_LIST_SUCCESS",
          payload: res?.data,
        });
      });
  } catch (err) {
    dispatch({
      type: "GET_TAG_LIST_FAILED",
    });
  }
};

export const postNewTag = (value) => async (dispatch) => {
  try {
    dispatch({
      type: "POST_TAG_LOADING",
    });

    axios
      .post(
        "https://mongo-express-learning-api.herokuapp.com/api/tags/addNewTag",
        {
          name: value.name,
        }
      )
      .then((res) => {
        dispatch({ type: "POST_TAG_SUCCESS", payload: res?.data });
      });
  } catch (err) {
    dispatch({ type: "POST_TAG_FAILED" });
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
