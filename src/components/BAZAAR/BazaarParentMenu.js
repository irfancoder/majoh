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
import ChildMenu from "./BazaarChildMenu";
import Firebase from "firebase";
import instance from "../../fire";

const MenuContainer = styled(Container)`
  margin-top: 2em;
  margin-bottom: 2em;
`;

const ParentMenu = ({ menu }) => {
  return (
    <MenuContainer maxWidth="md">
      <Grid container direction="row" justify="flex-start" xs={12} spacing={2}>
        {menu.map((item, index) => {
          return (
            <Grid key={index} item xs={12} md={3}>
              <ChildMenu menu={item} />
            </Grid>
          );
        })}
      </Grid>
    </MenuContainer>
  );
};

export default ParentMenu;
