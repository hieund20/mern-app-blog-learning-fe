import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "../../../store/actions/postsAction";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./Home.scss";

import ContentLayout from "../../layouts/Content/Content";

const Home = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);

  const navigate = useNavigate();

  const fetchPostList = async () => {
    await dispatch(getPostList());
  };

  const handleViewPost = (id) => {
    console.log(id);
    navigate(`posts/${id}`)
  }

  useEffect(() => {
    fetchPostList();
  }, []);

  return (
    <ContentLayout>
      <div className="home">
        {postList?.data?.length > 0 &&
          postList?.data?.map((el) => (
            <Card sx={{ minWidth: 350 }}
                  onClick={() => handleViewPost(el?._id)}>
              <CardMedia
                component="img"
                height="140"
                image={el?.thumbnailImage}
                alt="thumbnail"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {el?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {el?.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </ContentLayout>
  );
};

export default Home;
