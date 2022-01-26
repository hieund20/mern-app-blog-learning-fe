import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "../../../store/actions/postsAction";

const Home = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.postList)

  const fetchPostList = async () => {
    await dispatch(getPostList());
  };

  useEffect(() => {
    fetchPostList();
  }, [])

  console.log('post list', postList);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default Home;
