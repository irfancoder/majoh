import React from "react";
import styled from "styled-components";
import { Avatar, Typography } from "@material-ui/core";

const Container = styled.div`
  display: flex;
  margin-top: 2em;
`;

const VendorProfile = ({ vendor }) => {
  return (
    <Container>
      <Avatar>M</Avatar>
      {/* src={vendor.profile} alt={vendor.businessName} */}
      <div style={{ marginLeft: "2em" }}>
        <Typography variant="body2">vendor.businessName</Typography>
        <Typography variant="body2">Location</Typography>
      </div>
    </Container>
  );
};

export default VendorProfile;
