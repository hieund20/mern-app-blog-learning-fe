import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import { getPostDetail, updatePost } from "../../../store/actions/postsAction";
import ContentLayout from "../../layouts/Content/Content";
import "./EditPost.scss";

const EditPost = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const postDetail = useSelector((state) => state.postDetail);
  const { id } = useParams();

  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState();

  const [loading, setLoading] = useState(false);

  const fetchPostDetail = async () => {
    const payload = {
      _id: id,
    };

    dispatch(getPostDetail(payload));
  };

  const setDefaultStates = () => {
    setTitleValue(postDetail?.data?.title);
    setContentValue(postDetail?.data?.content);
  };

  const onChangeChooseFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setThumbnailImage(reader.result);
    };
  };

  const onSubmit = async (data) => {
    console.log(data);

    const updatePostDetail = {
      _id: id,
      title: data.title,
      content: data.content,
      authorId: "61f2507f8db81258c1dd86dd",
      thumbnail: thumbnailImage,
    };
    setLoading(true);

    setTimeout(async () => {
      await updatePost(updatePostDetail);

      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    fetchPostDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDefaultStates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postDetail]);

  console.log(postDetail);

  return (
    <ContentLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        {postDetail && !_.isEmpty(postDetail) && (
          <div className="edit-post">
            <div className="mb-3">
              <label>Title</label>
              <input
                {...register("title", { required: true })}
                value={titleValue}
                onChange={(e) => {
                  setTitleValue(e.target.value);
                }}
              />
              {errors.title && (
                <p className="error-message">This field is required</p>
              )}
            </div>

            <div className="mb-3">
              <label>Content</label>
              <textarea
                {...register("content", { required: true })}
                value={contentValue}
                onChange={(e) => {
                  setContentValue(e.target.value);
                }}
              />
              {errors.content && (
                <p className="error-message">This field is required</p>
              )}
            </div>

            <div className="mb-3 d-flex">
              <div>
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
              <div>
                <div className="thumbnail-overview">
                  <img
                    src={
                      thumbnailImage
                        ? thumbnailImage
                        : postDetail?.data?.thumbnailImage
                    }
                    alt="thumbnail"
                  />
                </div>
              </div>
            </div>

            <div>
              {loading && <Spinner></Spinner>}
              <input
                type="submit"
                className="edit-post-submit"
                value="Update"
              />
            </div>
          </div>
        )}
      </form>
    </ContentLayout>
  );
};

export default EditPost;
