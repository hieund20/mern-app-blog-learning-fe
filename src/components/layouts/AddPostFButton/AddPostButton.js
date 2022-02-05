import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const fabStyle = {
  position: "fixed",
  bottom: 32,
  right: 16,
  backgroundColor: "#e94c3d"
};

const AddPostButton = () => {
  return (
    <Link to={"/posts/addPost"} className="link">
      <Fab color="secondary" aria-label="add" sx={fabStyle}>
        <AddIcon />
      </Fab>
    </Link>
  );
};

export default AddPostButton;
