import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { deletePost } from "../../../../store/actions/postsAction";
import { useDispatch } from "react-redux";
import "./DeleteModal.scss";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const ConfirmModal = (props) => {
  const { open, onClose, postId } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(false);
  };

  const handleDeletePost = async () => {
    const payload = {
      _id: postId,
    };
    await dispatch(deletePost(payload));

    onClose(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="delete-post-modal"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 5 }}>
          Are you sure want to delete this post?
        </Typography>
        <Button className="cancel-button" onClick={() => onClose(false)}>Cancel</Button>
        <Button className="delete-button" onClick={() => handleDeletePost()}>Delete</Button>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
