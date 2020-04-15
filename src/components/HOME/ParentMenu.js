import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  useFirestoreCollectionData,
  useFirestore,
  SuspenseWithPerf,
} from "reactfire";

import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import ChildMenu from "./ChildMenu";
import Firebase from "firebase";
import instance from "../../fire";

const MenuContainer = styled(Container)`
  margin-top: 2em;
  margin-bottom: 2em;
`;
const HeaderContainer = styled.div`
  display: flex;
  padding-top: 2em;
  padding-bottom: 2em;
  align-items: baseline;
`;
const DeliveryNote = styled(Typography)`
  margin-left: 2em;
`;

const DeliveryTimes = styled(Typography)`
  margin-left: 1em;
`;

const ParentMenu = ({ meal, menu }) => {
  return (
    <MenuContainer maxWidth="md">
      <HeaderContainer>
        <Typography variant="h6"> {meal.title}</Typography>
        <DeliveryNote variant="caption" color="textSecondary">
          Delivery time:{" "}
        </DeliveryNote>
        <DeliveryTimes variant="subtitle2">
          {meal.start} - {meal.end}
        </DeliveryTimes>
      </HeaderContainer>

      <Grid container direction="row" justify="flex-start" xs={12} spacing={2}>
        {menu.map((item, index) => {
          return (
            <Grid key={index} item xs={12} md={4}>
              <ChildMenu menu={item} />
            </Grid>
          );
        })}
      </Grid>
    </MenuContainer>
  );
};

export default ParentMenu;
