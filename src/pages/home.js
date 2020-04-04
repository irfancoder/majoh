import React from "react";
import Banner from "../components/HOME/Banner";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import ParentMenu from "../components/HOME/ParentMenu";

const MenuHeader = styled(Typography)`
  text-transform: uppercase;
  margin: 1em;
  text-align: center;
`;

const bfast = {
  title: "Breakfast",
  start: "8AM",
  end: "9AM"
};

const lunch = {
  title: "Lunch",
  start: "11AM",
  end: "12PM"
};
const dinner = {
  title: "Dinner",
  start: "5PM",
  end: "6PM"
};
const Home = () => {
  return (
    <div>
      <Banner />
      <MenuHeader variant="h6">menu</MenuHeader>
      <ParentMenu menu={bfast} />
      <ParentMenu menu={lunch} />
      <ParentMenu menu={dinner} />
    </div>
  );
};

export default Home;
