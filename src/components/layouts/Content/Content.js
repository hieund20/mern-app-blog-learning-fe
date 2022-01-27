import React from "react";
import { Container } from "reactstrap";

const ContentLayout = (props) => {
  return (
    <Container className="border mt-5" fluid="lg">
      {props.children}
    </Container>
  );
};

export default ContentLayout;
