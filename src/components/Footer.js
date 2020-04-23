import React from "react";
import styled from "styled-components";
import color from "../styles/color";
import dimensions from "../styles/dimensions";
import Majoh from "../assets/images/majoh_logo.png";

import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const FooterContainer = styled.div`
  padding-top: 2em;
  padding-bottom: 3em;
  padding-left: ${dimensions.paddingHorizontalDesktop}em;
  padding-right: ${dimensions.paddingHorizontalDesktop}em;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: ${color.white};
  @media (max-width: ${dimensions.maxwidthTablet}px) {
    background-color: ${color.white};
    text-align: center;
    position: fixed;
    padding: 0;
    bottom: 0;
  }
`;
const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin: auto;
  @media (max-width: ${dimensions.maxwidthTablet}px) {
    display: none;
  }
`;

const FooterDescription = styled.div`
  max-width: 300px;
  font-family: BODY;
  font-size: 14px;
  color: ${color.gray};
  line-height: 1.8;
  margin-top: 2em;
  padding-left: 0.5em;
  @media (max-width: ${dimensions.maxwidthTablet}px) {
    display: none;
  }
`;

const FooterCopyright = styled.div`
  font-size: 10px;
  color: ${color.gray};
  text-align: center;
  padding-bottom: 0.5em;
  @media (max-width: ${dimensions.maxwidthTablet}px) {
  }
`;

const AdvertisingContainer = styled.div`
  display: flex;
  margin-left: 0.5em;
  margin-top: 1em;
  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    justify-content: space-evenly;
  }
`;

const Advertising = styled(Typography)`
  color: ${color.gray};
  text-transform: uppercase;
  padding-bottom: 0.5em;
  padding-right: 1em;
  text-decoration: underline;
  &: hover {
    margin: auto;
    color: ${color.red};
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 120px;
  @media (max-width: ${dimensions.maxwidthMobile}px) {
    display: none;
    padding: 0;
  }
`;

const date = new Date();
var year = date.getFullYear();

const Footer = () => {
  return (
    <FooterContainer>
      <TopContent>
        <Link to="/">
          <Logo src={Majoh} alt="Majoh Logo" />
        </Link>
      </TopContent>
      <FooterDescription>
        <Typography variant="body2">
          Majoh is a kitchen food delivery service company. We deliver food that
          belongs to the Malaysian families for breakfast, lunch &amp; dinner.
          Kita mula dari Sarawak!
        </Typography>
      </FooterDescription>
      <AdvertisingContainer>
        <Link style={{ textDecoration: "none" }} to="/privacypolicy">
          <Advertising variant="caption">Privacy policy</Advertising>
        </Link>

        <Link to="/contact">
          <Advertising variant="caption">Contact</Advertising>
        </Link>
      </AdvertisingContainer>
      <AdvertisingContainer>
        <FooterCopyright>
          © Majoh {year}. All rights reserved. Designed &amp; developed by{" "}
          <a href="https://www.ombak.dev">ombak devhouse</a>
        </FooterCopyright>
      </AdvertisingContainer>
    </FooterContainer>
  );
};

export default Footer;
