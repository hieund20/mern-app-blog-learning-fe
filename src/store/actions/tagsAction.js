import axiosClient from "../../helpers/axiosClient";

export const getTagList = () => {
  try {
    return axiosClient.get("/tags/getAllTags");
  } catch (err) {
    console.log(err);
  }
};

export const postNewTag = (payload) => {
  try {
    axiosClient.post("/tags/addNewTag", {
      name: payload.name,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTag = (payload) => {
  try {
    axiosClient.delete(`/tags/deleteTag/${payload._id}`);
  } catch (err) {
    console.log(err);
  }
};
