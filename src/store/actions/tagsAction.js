import axiosClient from "../../helpers/axiosClient";

export const getTagList = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_TAG_LIST_LOADING",
    });

    await axiosClient.get("/tags/getAllTags").then((res) => {
      console.log("tag list", res);
      dispatch({
        type: "GET_TAG_LIST_SUCCESS",
        payload: res,
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

    axiosClient
      .post("/tags/addNewTag", {
        name: value.name,
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "POST_TAG_SUCCESS", payload: res });
      });
  } catch (err) {
    dispatch({ type: "POST_TAG_FAILED" });
  }
};

export const deleteTag = (value) => async (dispatch) => {
  try {
    axiosClient.delete(`/tags/deleteTag/${value._id}`).then(() => {
      dispatch({
        type: "DELETE_TAG_SUCCESS",
        payload: value?._id,
      });
    });
  } catch (err) {
    console.log("Error when DELETE", err);
  }
};
