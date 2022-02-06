import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import logo from "../../../assets/icons/logo.png";
import "./Header.scss";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Header = () => {
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);

  return (
    <header className="header">
      <Navbar color="light" expand="md" fixed="top" light>
        <NavbarBrand tag={"span"}>
          <Link to={"/"}>
            <img
              src={logo}
              style={{ width: "100%", height: "40px" }}
              alt="logo"
            />
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpenCollapse(!isOpenCollapse)} />
        <Collapse navbar isOpen={isOpenCollapse}>
          <Nav className="me-auto" navbar>
            <NavItem tag={"span"}>
              <Link to={"/"} className="link">
                Trang chủ
              </Link>
            </NavItem>
            <NavItem tag={"span"}>
              <Link to={"/posts/addPost"} className="link">
                About me
              </Link>
            </NavItem>
            <NavItem tag={"span"}>
              <Link to={"/login"} className="link">
                Đăng nhập
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
