import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <CssBaseline />
      <Header></Header>
      <Container maxWidth={"md"}>{children}</Container>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
