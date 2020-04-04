import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import ChildMenu from "./ChildMenu";

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
const sample = [0, 1, 2, 3, 4, 5];

const ParentMenu = ({ menu }) => {
  return (
    <MenuContainer maxWidth="md">
      <HeaderContainer>
        <MenuTitle variant="h6">{menu.title}</MenuTitle>
        <DeliveryTimes variant="subtitle2">
          {menu.start} - {menu.end}
        </DeliveryTimes>
      </HeaderContainer>
      <Grid container direction="row" justify="flex-start" xs={12} spacing={2}>
        {sample.map((value, index) => {
          return (
            <Grid key={value} item xs={4}>
              <ChildMenu />
            </Grid>
          );
        })}
      </Grid>
    </MenuContainer>
  );
};

export default ParentMenu;
