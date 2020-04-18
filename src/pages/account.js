import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import SettingsCard from "../components/SETTINGS/SettingsCard";
import Button from "@material-ui/core/Button";
import SignUpModal from "../components/SETTINGS/SignUpModal";
import SignIn from "../components/SETTINGS/SignIn";
import MuiContainer from "@material-ui/core/Container";
import { isUserLoggedIn, signOutUser } from "../utils/index";
import Firebase from "../fire";
import { Helmet } from "react-helmet";
import StripeComponent from "../components/StripeInterface";
import favicon from "../assets/images/favicon.ico";

const Container = withStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
})(MuiContainer);

const Account = () => {
  const [user, setUser] = useState(isUserLoggedIn());

  useEffect(() => {
    if (user === null) {
      Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          setUser(user);
        }
      });
    }
  }, [user]);

  const handleUserLogout = () => {
    signOutUser();
    setUser(null);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Account - Majoh</title>
        <link rel="canonical" href="http://majoh.com.my/account" />
        <link rel="icon" type="image/ico" href={favicon} sizes="16x16" />
      </Helmet>
      <Container>
        {user !== null ? (
          <SettingsCard logout={handleUserLogout} />
        ) : (
          <SignUpModal />
        )}
      </Container>
    </>
  );
};

export default Account;
