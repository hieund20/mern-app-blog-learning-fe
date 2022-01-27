import React, { useEffect, useRef, useState } from "react";
import ContentLayout from "../../layouts/Content/Content";
import { useForm } from "react-hook-form";
import { postNewPost } from "../../../store/actions/postsAction";
import "./AddPost.scss";

const AddPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [thumbnailImage, setThumbnailImage] = useState("");

  const onChangeChooseFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setThumbnailImage(reader.result);
    };
  };

  // const toBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = (error) => reject(error);
  //   });

  const onSubmit = async (data) => {
    console.log("Submit form", data);

    const newPost = {
      title: data.title,
      content: data.content,
      authorId: "61f2507f8db81258c1dd86dd",
      thumbnail: thumbnailImage,
    };

    postNewPost(newPost);
  };

  return (
    <ContentLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="add-post">
        <div className="mb-3">
          <label>Title</label>
          <input {...register("title", { required: true })} />
          {errors.title && (
            <p className="error-message">This field is required</p>
          )}
        </div>

        <div className="mb-3">
          <label>Content</label>
          <textarea {...register("content", { required: true })} />
          {errors.content && (
            <p className="error-message">This field is required</p>
          )}
        </div>

        <div className="mb-3">
          <p>Choose a thumbnail</p>
          <input
            type="file"
            {...register("thumbnail", { required: true })}
            onChange={onChangeChooseFile}
          />
          {errors.thumbnail && (
            <p className="error-message">Thumbnail is required</p>
          )}
        </div>

        <div className="mb-5">
          <div className="thumbnail-overview">
            <img src={thumbnailImage} alt="thumbnail" />
          </div>
        </div>

        <input type="submit" className="add-post-submit" value="Post" />
      </form>
    </ContentLayout>
  );
};

export default AddPost;
