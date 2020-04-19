import React from "react";
import Banner from "../components/HOME/Banner";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import ParentMenu from "../components/HOME/ParentMenu";
import {
  useFirestoreCollectionData,
  useFirestore,
  SuspenseWithPerf,
} from "reactfire";
import { groupBy } from "../utils";
import { Helmet } from "react-helmet";
import TabComponent from "../components/BAZAAR/Tabs";
import Box from "@material-ui/core/Box";
import favicon from "../assets/images/favicon.ico";

const MenuHeader = styled(Typography)`
  text-transform: uppercase;
  margin: 1em;
  text-align: center;
  alignitems: center;
  justify: center;
`;

const meal = {
  breakfast: {
    title: "Breakfast",
    start: "8AM",
    end: "9AM",
  },
  lunch: {
    title: "Lunch",
    start: "11AM",
    end: "12PM",
  },
  dinner: {
    title: "Dinner",
    start: "5PM",
    end: "6PM",
  },
};

const Home = () => {
  const MenuData = () => {
    const menuRef = useFirestore()
      .collection("vendor")
      .doc(" k8oheqc44eknonnybq8")
      .collection("menu");

    const dataMenu = useFirestoreCollectionData(menuRef);

    const sortedMenu = groupBy(dataMenu, "type");

    console.log(sortedMenu);

    return Object.keys(sortedMenu).map((key, index) => {
      return <ParentMenu key={index} meal={meal[key]} menu={sortedMenu[key]} />;
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Majoh | Miri's Humble Kitchen Food Delivery</title>
        <link rel="canonical" href="http://majoh.com.my" />
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
      </Helmet>

      <div>
        <Banner />

        {/*
        <MenuHeader variant="h6">
          menu
      
        </]MenuHeader>
        */}

        <TabComponent></TabComponent>
      </div>
    </>
  );
};

export default Home;
