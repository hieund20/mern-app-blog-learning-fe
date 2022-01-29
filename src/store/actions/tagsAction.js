import axios from "axios";

export const getTagList = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_TAG_LIST_LOADING",
    });

    const res = await axios.get(
      "https://mongo-express-learning-api.herokuapp.com/api/tags/getAllTags"
    );

    dispatch({
      type: "GET_TAG_LIST_SUCCESS",
      payload: res?.data,
    });
  } catch (err) {
    console.log("error", err);
    dispatch({
      type: "GET_TAG_LIST_FAILED",
    });
  }
};

export const postNewTag = (payload) => {
  try {
    axios.post(
      "https://mongo-express-learning-api.herokuapp.com/api/tags/addNewTag",
      {
        name: payload.name,
      }
    );
  } catch (err) {
    console.log("Error when POST", err);
  }
};

export const deleteTag = (payload) => async (dispatch) => {
  try {
    axios.delete(
      `https://mongo-express-learning-api.herokuapp.com/api/tags/deleteTag/${payload._id}`
    );

    dispatch({
      type: "DELETE_TAG_SUCCESS",
      payload: payload?._id,
    });
  } catch (err) {
    console.log("Error when DELETE", err);
  }
};
