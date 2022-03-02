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
import "firebase/compat/auth";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import editIcon from "../../../assets/icons/edit.svg";
import moreIcon from "../../../assets/icons/more.svg";
import removeIcon from "../../../assets/icons/remove.svg";
import clockIcon from "../../../assets/icons/schedule.svg";
import eyeIcon from "../../../assets/icons/eye.svg";
import likeIcon from "../../../assets/icons/like.svg";
import { useOnClickOutside, useHover } from "../../../helpers/hooks/customHook";
import { getPostList } from "../../../store/actions/postsAction";
import ContentLayout from "../../layouts/Content/Content";
import "./Home.scss";
import DeleteModal from "./SubComponent/DeleteModal";
import { AUTHOR_UID } from "../../../constants/constants";

const Home = (props) => {
  const { isSignedIn, userLogged } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);

  const [actionShow, setActionShow] = useState({
    idx: "",
    show: false,
  });
  const [modalShow, setModalShow] = useState(false);
  const [postId, setPostId] = useState("");
  const actionDropdownRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [isHoverRef, setHoverRef] = useState();

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
    await dispatch(
      getPostList(pagination).then((res) => {
        console.log("res post", res);
        if (res?.status === "success") {
          setTotalPage(res?.totalPage);
          setPostList(res?.responseData);
        }
      })
    );
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

  console.log("[HOME PAGE] Check user login", isSignedIn);
  console.log("[HOME PAGE] Check logged user uid", userLogged?.uid);
  console.log("is hover", isHoverRef);

  return (
    <ContentLayout>
      <div className="home">
        {postList?.length > 0 &&
          postList?.map((el, idx) => (
            <div className="custom-card" key={idx}>
              <div className="custom-card__container">
                <div className="custom-card__container--left">
                  <div
                    onMouseEnter={() => setHoverRef(true)}
                    onMouseLeave={() => setHoverRef(false)}
                  >
                    <img src={el?.thumbnailImage} alt="thumbnail" />
                    {isHoverRef && (
                      <div onClick={() => handleViewPost(el?._id)}>
                        <p>Xem</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <div>
                      <img src={eyeIcon} alt="eye-icon" />
                      {" 999"}
                    </div>
                    <div>
                      <img src={likeIcon} alt="like-icon" />
                      {" 999"}
                    </div>
                  </div>
                </div>
                <div className="custom-card__container--right">
                  <p>{el?.title}</p>
                  <p>02/03/2022</p>
                  <p>
                    <img src={clockIcon} alt="clock-icon" />
                    {" 20 phút đọc"}
                  </p>
                  {el?.tags.length > 0 && (
                    <Stack direction="row" spacing={1}>
                      {el?.tags.map((tag) => (
                        <Chip label={tag} color="primary" variant="outlined" />
                      ))}
                    </Stack>
                  )}
                </div>
                <div className="custom-card__container--action">
                  <div onClick={() => handleEditPost(el?._id)}>
                    <img src={editIcon} alt="edit-icon" />
                  </div>
                  <div
                    onClick={() => {
                      setPostId(el?._id);
                      setModalShow(true);
                    }}
                  >
                    <img src={removeIcon} alt="remove-icon" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        {modalShow && (
          <DeleteModal
            open={modalShow}
            onClose={setModalShow}
            postId={postId}
            refreshData={fetchPostList}
          />
        )}
      </div>
      <div className="pagination">
        <Pagination count={totalPage} shape="rounded" onChange={onPageChange} />
      </div>
    </ContentLayout>
  );
};

export default Home;
