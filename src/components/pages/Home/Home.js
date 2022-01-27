import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "../../../store/actions/postsAction";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import "./Home.scss";

import ContentLayout from "../../layouts/Content/Content";

const Home = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);

  const fetchPostList = async () => {
    await dispatch(getPostList());
  };

  useEffect(() => {
    fetchPostList();
  }, []);

  console.log("post list", postList);

  return (
    <ContentLayout>
      <div className="home">
        {postList?.data?.length > 0 &&
          postList?.data?.map((el) => (
            <Card sx={{ minWidth: 350 }}>
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
