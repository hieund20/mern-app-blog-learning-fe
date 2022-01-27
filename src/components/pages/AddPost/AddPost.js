import React from "react";
import ContentLayout from "../../layouts/Content/Content";
import { useForm } from "react-hook-form";
import "./AddPost.scss";

const AddPost = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submit form", data);
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

        <input type="submit" className="add-post-submit" value="Post"/>
      </form>
    </ContentLayout>
  );
};

export default AddPost;
