import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem
} from "reactstrap";
import logo from "../../../assets/icons/logo.png";
import "./Header.scss";

const Header = () => {
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);

  return (
    <header className="header">
      {/* Need to fixed top */}
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
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
