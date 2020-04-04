import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";

const Container = styled(Card)`
  background-color: #6772e5;
  color: #fff;
  width: 100%;
  height: 200px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
`;

const Banner = () => {
  return <Container />;
};

export default Banner;
