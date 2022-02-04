import { Avatar, TextField } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../../../store/actions/postsAction";
import ContentLayout from "../../layouts/Content/Content";
import "./PostDetail.scss";

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

  console.log("is signed", isSignedIn);

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

  //If user log out, it will return null
  console.log("user logged", firebase.auth().currentUser);

  useEffect(() => {
    fetchPostDetail();
  }, []);

  useEffect(() => {
    if (!isSignedIn) return;

    setUserLogged(firebase?.auth()?.currentUser?.multiFactor?.user);
  }, []);

  console.log("user logged", userLogged);

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
                  <p>Đăng nhập để bình luận</p>
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </div>
              ) : (
                <div className="post-detail-container__comment--logged">
                  <div>
                    <Avatar
                      alt={userLogged?.displayName}
                      src={userLogged?.photoURL}
                      sx={{ marginRight: "8px" }}
                    />
                    <div>{userLogged?.displayName}</div>
                  </div>
                  <form>
                    <textarea type="text" />
                    <div>
                      <input type="submit" value="Gửi bình luận" />
                    </div>
                  </form>
                  <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
};

export default PostDetail;
