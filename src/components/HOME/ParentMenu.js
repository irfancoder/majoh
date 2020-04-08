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
  margin-bottom: 6em;
`;
const HeaderContainer = styled.div`
  display: flex;
  padding-top: 2em;
  padding-bottom: 2em;
  align-items: baseline;
`;
const MenuTitle = styled(Typography)``;

const DeliveryTimes = styled(Typography)`
  margin-left: 2em;
`;

const ParentMenu = ({ menu }) => {
  const MenuData = () => {
    const menuRef = useFirestore()
      .collection("vendor")
      .doc(" k8oheqc44eknonnybq8")
      .collection("menu");

    const dataMenu = useFirestoreCollectionData(menuRef);

    return dataMenu.map((item, index) => {
      return (
        <Grid key={index} item xs={4}>
          <ChildMenu menu={item} />
        </Grid>
      );
    });
  };

  return (
    <MenuContainer maxWidth="md">
      <HeaderContainer>
        <MenuTitle variant="h6">{menu.title}</MenuTitle>
        <DeliveryTimes variant="subtitle2">
          {menu.start} - {menu.end}
        </DeliveryTimes>
      </HeaderContainer>

      <Grid container direction="row" justify="flex-start" xs={12} spacing={2}>
        <SuspenseWithPerf
          fallback={<p>loading delicious food</p>}
          traceId={"load-burrito-status"}
        >
          <MenuData />
        </SuspenseWithPerf>
      </Grid>
    </MenuContainer>
  );
};

export default ParentMenu;
