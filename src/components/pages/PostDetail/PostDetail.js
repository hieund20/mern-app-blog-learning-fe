import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../../../store/actions/postsAction";
import ContentLayout from "../../layouts/Content/Content";
import _ from "lodash";
import moment from "moment";
import editIcon from "../../../assets/icons/edit.svg";
import removeIcon from "../../../assets/icons/remove.svg";

import "./PostDetail.scss";

const PostDetail = () => {
  const dispatch = useDispatch();
  const postDetail = useSelector((state) => state.postDetail);
  const { id } = useParams();

  const fetchPostDetail = async () => {
    const payload = {
      id: id,
    };
    await dispatch(getPostDetail(payload));
  };

  console.log(postDetail);

  useEffect(() => {
    fetchPostDetail();
  }, []);

  return (
    <ContentLayout>
      <div className="post-detail">
        {postDetail && !_.isEmpty(postDetail?.data) && (
          <div className="post-detail-container">
            <div className="d-flex justify-content-between">
              <div>
                <h2>{postDetail?.data?.title}</h2>
              </div>
              <div>
                <div>
                  <img src={editIcon} alt="edit-icon" />
                  {" Edit this post"}
                </div>
                <div>
                  <img src={removeIcon} alt="remove-icon" />
                  {" Delete this post"}
                </div>
              </div>
            </div>
            <p>
              {postDetail?.data?.author} -{" "}
              {moment(postDetail?.data?.createdAt).format(
                "DD/MM/YYYY, h:mm:ss A"
              )}
            </p>
            <div>
              <img src={postDetail?.data?.thumbnailImage} alt="thumbnail" />
            </div>
            <p>{postDetail?.data?.content}</p>
          </div>
        )}
      </div>
    </ContentLayout>
  );
};

export default PostDetail;
