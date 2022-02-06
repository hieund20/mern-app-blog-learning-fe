import { Avatar, Pagination } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommentList } from "../../../store/actions/commentActions";
import { getPostDetail } from "../../../store/actions/postsAction";
import ContentLayout from "../../layouts/Content/Content";
import "./PostDetail.scss";
import Comment from "./SubComponents/Comment/Comment";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const PostDetail = (props) => {
  const { isSignedIn } = props;
  const [userLogged, setUserLogged] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const postDetail = useSelector((state) => state.postDetail);
  const commentList = useSelector((state) => state.commentList);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPostDetail = async () => {
    const payload = {
      _id: id,
    };
    await dispatch(getPostDetail(payload));
  };

  const fetchCommentList = async () => {
    const pagination = {
      page: currentPage,
      limit: 5,
    };
    await dispatch(getCommentList(pagination));
  };

  useEffect(() => {
    fetchPostDetail();
  }, []);

  useEffect(() => {
    fetchCommentList();
  }, [currentPage]);

  useEffect(() => {
    if (!isSignedIn) return;

    setUserLogged(firebase?.auth()?.currentUser?.multiFactor?.user);
  }, []);

  console.log(postDetail);

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
            <div className="post-detail-container__comment">
              <p>Bình luận</p>

              {!isSignedIn ? (
                <div className="post-detail-container__comment--logout">
                  <div>Đăng nhập để bình luận</div>
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </div>
              ) : (
                <div className="post-detail-container__comment--logged">
                  <Comment userLogged={userLogged} />
                </div>
              )}
              {/* CommentList */}
              {commentList &&
                commentList?.data?.responseData?.length > 0 &&
                commentList?.data?.responseData?.map((comment) => (
                  <div className="post-detail-container__comment__list">
                    {comment?.post === id && (
                      <>
                        <div>
                          <Avatar
                            alt={comment?.author?.displayName}
                            src={comment?.author?.photoURL}
                            sx={{ marginRight: "8px" }}
                          />
                          <div className="author-name">
                            {comment?.author?.displayName ||
                              "Người dùng ẩn danh"}
                          </div>
                        </div>
                        <div>{comment?.content}</div>
                      </>
                    )}
                  </div>
                ))}
              <div className="pagination">
                <Pagination
                  count={commentList?.data?.totalPage}
                  shape="rounded"
                  onChange={(e, value) => setCurrentPage(value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
};

export default PostDetail;
