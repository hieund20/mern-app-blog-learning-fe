import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../../../store/actions/postsAction";
import ContentLayout from "../../layouts/Content/Content";
import _ from "lodash";
import moment from "moment";

import "./PostDetail.scss";

const PostDetail = () => {
  const dispatch = useDispatch();
  const postDetail = useSelector((state) => state.postDetail);
  const { id } = useParams();

  const fetchPostDetail = async () => {
    const payload = {
      _id: id,
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
            <h2>{postDetail?.data?.title}</h2>
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
