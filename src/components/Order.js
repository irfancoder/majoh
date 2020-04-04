import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";

import styled from "styled-components";

const anchor = "right";
const Container = styled.div`
  width: 500px;
  box-sizing: border-box;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const useStyles = makeStyles(() => ({
//   title: {
//     fontWeight: 500
//   }
// }));

const Order = ({ open, handleDrawer }) => {
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={handleDrawer(false)}
      onOpen={handleDrawer(true)}
    >
      <Container>
        <Typography variant="h5">My Orders</Typography>
      </Container>
    </SwipeableDrawer>
  );
};

export default Order;
