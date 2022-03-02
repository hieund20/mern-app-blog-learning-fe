import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../../assets/avatars/avatar_1.jfif";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <Avatar
          sx={{
            width: "150px",
            height: "150px",
            marginTop: "30px",
            marginBottom: "15px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          src={avatar}
          alt="hieund"
        />
        <p className="author">hieund</p>
        <Link className="sidebar-link" to={"/"}>
          Home
        </Link>
        <Link className="sidebar-link" to={"/contact"}>
          Contact
        </Link>
        <Link className="sidebar-link" to={"/about-me"}>
          About me
        </Link>
        <span>
          {`Design && Coding by `}
          <a href="https://github.com/hieund20" target="_blank" rel="noopener">
            hieund
          </a>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
