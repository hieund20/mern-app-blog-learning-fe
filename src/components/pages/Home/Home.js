import { Chip, Stack } from "@mui/material";
import "firebase/compat/auth";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import editIcon from "../../../assets/icons/edit.svg";
import moreVerIcon from "../../../assets/icons/more-vertical.svg";
import removeIcon from "../../../assets/icons/remove.svg";
import { AUTHOR_UID } from "../../../constants/constants";
import { useOnClickOutside } from "../../../helpers/hooks/customHook";
import { getPostList } from "../../../store/actions/postsAction";
import ContentLayout from "../../layouts/Content/Content";
import "./Home.scss";
import DeleteModal from "./SubComponent/DeleteModal";

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

  useOnClickOutside(actionDropdownRef, () =>
    setActionShow({
      ...actionShow,
      show: false,
    })
  );

  const fetchPostList = async () => {
    await dispatch(
      getPostList().then((res) => {
        if (res?.status === "success") {
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

  useEffect(() => {
    fetchPostList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("[HOME PAGE] Check user login", isSignedIn);
  console.log("[HOME PAGE] Check logged user uid", userLogged?.uid);

  return (
    <ContentLayout>
      <div className="home">
        {postList?.length > 0 &&
          postList?.map((el, idx) => (
            <div className="post" key={idx}>
              <div className="post__container">
                <div className="post__container--left">
                  <div className="title">
                    <div onClick={() => handleViewPost(el?._id)}>
                      {el?.title}
                    </div>
                    <div>{`22/02/2022 - 14 phut doc`}</div>
                  </div>
                  <div className="author">hieund</div>
                  <div className="tags">
                    {el?.tags.length > 0 && (
                      <Stack direction="row" spacing={1}>
                        {el?.tags.map((tag) => (
                          <Chip
                            label={tag}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    )}
                  </div>
                </div>
                <div className="post__container--right">
                  {isSignedIn && userLogged?.uid === AUTHOR_UID && (
                    <div className="actions-row-more">
                      <img
                        src={moreVerIcon}
                        alt="more-ver-icon"
                        onClick={() => handleShowActionDropdown(idx)}
                      />
                      {actionShow.show && actionShow.idx === idx && (
                        <div className="actions-dropdown">
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
                      )}
                    </div>
                  )}
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
    </ContentLayout>
  );
};

export default Home;
