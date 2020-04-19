import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { OrderProvider } from "../utils/contextbazaar";
import dimensions from "../styles/dimensions";

const Container = styled.div`
  max-width: ${dimensions.maxwidthDesktop}px;
  margin: auto;
  box-sizing: border-box;
  padding-bottom: 6em;
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  return (
    <div>
      <OrderProvider>
        <Header></Header>
        <CssBaseline />
        <Container>{children}</Container>
        <Footer></Footer>
      </OrderProvider>
    </div>
  );
};

export default Layout;
