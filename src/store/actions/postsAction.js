import axiosClient from "../../helpers/axiosClient";

export const getPostList = (payload) => {
  try {
    return axiosClient.get(
      `/posts/getAllPost?page=${payload.page}&limit=${payload.limit}`
    );
  } catch (err) {
    console.log(err);
  }
};

export const getPostDetail = (payload) => {
  try {
    return axiosClient.get(`/posts/getAllPost/${payload._id}`);
  } catch (err) {
    console.log(err);
  }
};

export const postNewPost = async (payload) => {
  try {
    axiosClient.post("/posts/addNewPost", {
      title: payload.title,
      content: payload.content,
      author: payload.authorId,
      thumbnailImage: payload.thumbnail,
      tags: payload.tags,
    });
  } catch (err) {
    console.log("Error when POST", err);
  }
};

export const updatePost = (payload) => {
  try {
    axiosClient.patch(`/posts/updatePost`, {
      _id: payload._id,
      title: payload.title,
      content: payload.content,
      author: payload.authorId,
      thumbnailImage: payload.thumbnail,
      tags: payload.tags,
    });
  } catch (err) {
    console.log("Error when PATCH", err);
  }
};

export const deletePost = (payload) => {
  try {
    axiosClient.delete(`/posts/deletePost/${payload._id}`);
  } catch (err) {
    console.log(err);
  }
};
