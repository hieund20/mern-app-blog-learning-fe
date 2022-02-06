import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ContentLayout from "../../layouts/Content/Content";
import "./Login.scss";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const Login = () => {
  return (
    <ContentLayout>
      <div className="login">
        <p>Đăng nhập</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    </ContentLayout>
  );
};

export default Login;
