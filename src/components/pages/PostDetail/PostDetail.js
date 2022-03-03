import { Avatar } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import moment from "moment";
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch } from "react-redux";
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
  const { isSignedIn, userLogged } = props;
  const { id } = useParams();
  const dispatch = useDispatch();

  const [postDetail, setPostDetail] = useState([]);
  const [commentList, setCommentList] = useState([]);

  const fetchPostDetail = async () => {
    const payload = {
      _id: id,
    };
    await dispatch(
      getPostDetail(payload).then((res) => {
        console.log("res post detail", res);
        //Need to add status to API
        setPostDetail(res);
      })
    );
  };

  const fetchCommentList = async () => {
    await dispatch(
      getCommentList().then((res) => {
        console.log("res comment", res);
        if (res?.status === "success") {
          setCommentList(res?.responseData);
        }
      })
    );
  };

  const createMarkup = (content) => {
    return { __html: content };
  };

  useEffect(() => {
    fetchPostDetail();
  }, []);

  useEffect(() => {
    fetchCommentList();
  }, []);

  console.log("[POST DETAIL] Check logged user infor ", userLogged);

  return (
    <ContentLayout>
      <div className="post-detail">
        {postDetail && (
          <div className="post-detail-container">
            <div className="title">
              <div>{postDetail?.title}</div>
            </div>
            <div className="author">
              <div>{`hieund `}</div>
              <div>
                {moment(postDetail?.createdAt).format("DD/MM/YYYY") +
                  " - 14 phut doc"}
              </div>
            </div>
            <div className="thumbnail">
              <img src={postDetail?.thumbnailImage} alt="thumbnail" />
            </div>
            <div
              dangerouslySetInnerHTML={createMarkup(postDetail?.content)}
            ></div>
            <div className="post-detail-container__comment">
              <p>Bình luận</p>

              {!isSignedIn ? (
                <div className="post-detail-container__comment--logout">
                  <div>Tham gia bình luận</div>
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </div>
              ) : (
                <div className="post-detail-container__comment--logged">
                  <Comment
                    userLogged={userLogged}
                    refreshData={fetchCommentList}
                  />
                </div>
              )}
              {/* CommentList */}
              {commentList?.length > 0 &&
                commentList?.map((comment) => (
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
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
};

export default PostDetail;
