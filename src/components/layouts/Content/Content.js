import React from "react";
import { Container } from "reactstrap";
import "./Content.scss";

const ContentLayout = (props) => {
  return (
    <Container className="content-layout" fluid="lg">
      {props.children}
    </Container>
  );
};

export default ContentLayout;
