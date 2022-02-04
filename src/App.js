import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/layouts/Header/Header";
import AddPost from "./components/pages/AddPost/AddPost";
import EditPost from "./components/pages/EditPost/EditPost";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import PostDetail from "./components/pages/PostDetail/PostDetail";

//Lazy loading components

// Configure Firebase.
const config = {
  apiKey: "AIzaSyDelFe4ZXH1u06vTWbJka8J-k8pMWVR0BE",
  authDomain: "mern-blog-28420.firebaseapp.com",
};
firebase.initializeApp(config);

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  //Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) {
          console.log("User is not logged");
          return;
        }
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/posts/:id"
              element={<PostDetail isSignedIn={isSignedIn} />}
            />
            <Route path="/posts/addPost" element={<AddPost />} />
            <Route path="/posts/editPost/:id" element={<EditPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
