import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { OrderProvider } from "../utils/context";
import dimensions from "../styles/dimensions";

const Container = styled.div`
  max-width: ${dimensions.maxwidthDesktop}px;
  margin: auto;
`;

const Layout = ({ children }) => {
  return (
    <div>
      <OrderProvider>
        <CssBaseline />
        <Header></Header>
        <Container>{children}</Container>
        <Footer></Footer>
      </OrderProvider>
    </div>
  );
};

export default Layout;
