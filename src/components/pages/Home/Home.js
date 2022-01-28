import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostList, deletePost } from "../../../store/actions/postsAction";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import editIcon from "../../../assets/icons/edit.svg";
import removeIcon from "../../../assets/icons/remove.svg";
import moreIcon from "../../../assets/icons/more.svg";
import ContentLayout from "../../layouts/Content/Content";
import DeleteModal from "./SubComponent/DeleteModal";

import "./Home.scss";

const Home = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const navigate = useNavigate();

  const [actionShow, setActionShow] = useState({
    idx: "",
    show: false,
  });
  const [modalShow, setModalShow] = useState(false);

  const fetchPostList = async () => {
    await dispatch(getPostList());
  };

  const handleViewPost = (id) => {
    navigate(`posts/${id}`);
  };

  const handleDeletePost = async (_id) => {
    // const payload = {
    //   _id: _id,
    // };

    // await dispatch(deletePost(payload));
    setModalShow(true);
  };

  const handleShowActionDropdown = (idx) => {
    setActionShow({
      idx: idx,
      show: !actionShow.show,
    });
  };

  useEffect(() => {
    fetchPostList();
  }, []);

  return (
    <ContentLayout>
      <div className="home">
        {postList?.data?.length > 0 &&
          postList?.data?.map((el, idx) => (
            <Card key={el?._id} className="post">
              <CardMedia
                component="img"
                height="170"
                image={el?.thumbnailImage}
                alt="thumbnail"
              />
              <CardContent className="post-title">
                <p className="post-title-content">{el?.title}</p>
              </CardContent>
              <CardActions className="post-actions">
                <Button size="small" onClick={() => handleViewPost(el?._id)}>
                  Learn More
                </Button>
                <div className="action-dropdown">
                  <img
                    src={moreIcon}
                    alt=""
                    onClick={() => handleShowActionDropdown(idx)}
                  />
                  {actionShow.idx === idx && actionShow.show && (
                    <div className="action-dropdown-items" key={idx}>
                      <div>
                        <img src={editIcon} alt="edit-icon" />
                        {"Edit this post"}
                      </div>
                      <div onClick={() => handleDeletePost(el?._id)}>
                        <img src={removeIcon} alt="remove-icon" />
                        {"Delete this post"}
                      </div>
                    </div>
                  )}
                </div>
              </CardActions>
            </Card>
          ))}
        {modalShow && <DeleteModal open={modalShow} onClose={setModalShow} />}
      </div>
    </ContentLayout>
  );
};

export default Home;
