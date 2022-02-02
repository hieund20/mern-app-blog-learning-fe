import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostList, deletePost } from "../../../store/actions/postsAction";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Pagination,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import editIcon from "../../../assets/icons/edit.svg";
import removeIcon from "../../../assets/icons/remove.svg";
import moreIcon from "../../../assets/icons/more.svg";
import ContentLayout from "../../layouts/Content/Content";
import DeleteModal from "./SubComponent/DeleteModal";
import { useOnClickOutside } from "../../../helpers/hooks/customHook";

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
  const [postId, setPostId] = useState("");
  const actionDropdownRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);

  useOnClickOutside(actionDropdownRef, () =>
    setActionShow({
      ...actionShow,
      show: false,
    })
  );

  const fetchPostList = async () => {
    const pagination = {
      page: currentPage,
      limit: 6,
    };
    await dispatch(getPostList(pagination));
  };

  const handleViewPost = (id) => {
    navigate(`posts/${id}`);
  };

  const handleEditPost = (id) => {
    navigate(`posts/editPost/${id}`);
  };

  const handleShowActionDropdown = (idx) => {
    setActionShow({
      idx: idx,
      show: !actionShow.show,
    });
  };

  const onPageChange = (e, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    fetchPostList();
  }, [currentPage]);

  console.log(postList);

  return (
    <ContentLayout>
      <div className="home">
        {postList?.data?.responseData?.length > 0 &&
          postList?.data?.responseData.map((el, idx) => (
            <Card key={el?._id} className="post">
              <CardMedia
                component="img"
                height="170"
                image={el?.thumbnailImage}
                alt="thumbnail"
              />
              <CardContent className="post-title">
                <p className="post-title-content">{el?.title}</p>
                {el?.tags.length > 0 && (
                  <Stack direction="row" spacing={1}>
                    {el?.tags.map((tag) => (
                      <Chip label={tag} color="primary" variant="outlined" />
                    ))}
                  </Stack>
                )}
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
                    <div
                      className="action-dropdown-items"
                      key={idx}
                      ref={actionDropdownRef}
                    >
                      <div onClick={() => handleEditPost(el?._id)}>
                        <img src={editIcon} alt="edit-icon" />
                        {"Edit this post"}
                      </div>
                      <div
                        onClick={() => {
                          setPostId(el?._id);
                          setModalShow(true);
                        }}
                      >
                        <img src={removeIcon} alt="remove-icon" />
                        {"Delete this post"}
                      </div>
                    </div>
                  )}
                </div>
              </CardActions>
            </Card>
          ))}
        {modalShow && (
          <DeleteModal
            open={modalShow}
            onClose={setModalShow}
            postId={postId}
          />
        )}
      </div>
      <div className="pagination">
        <Pagination
          count={postList?.data?.totalPage}
          shape="rounded"
          onChange={onPageChange}
        />
      </div>
    </ContentLayout>
  );
};

export default Home;
