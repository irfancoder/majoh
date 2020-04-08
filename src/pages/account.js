import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import SettingsCard from "../components/SETTINGS/SettingsCard";
import Button from "@material-ui/core/Button";
import SignUpModal from "../components/SETTINGS/SignUpModal";
import SignIn from "../components/SETTINGS/SignIn";
import MuiContainer from "@material-ui/core/Container";
import { isUserLoggedIn, signOutUser } from "../utils/index";
import Firebase from "../fire";
import StripeComponent from "../components/StripeTest"
import StripeTest from "../components/StripeTest";

const UserActionButton = withStyles({
  root: {},
})(Button);

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
          console.log(user);
        }
      });
    }
  }, [user]);

  console.log(user);

  const handleUserLogout = () => {
    signOutUser();
    setUser(null);
  };
  const obj = {
      quantity: 3,
      amount: 15000,
      name: "nasi rendang",
      desc: "good all stuff", 
      customerEmail: "marcosjconcon@gmail.com"
  }
  return (
    <Container>
      {/*
      {user !== null ? (
        <SettingsCard logout={handleUserLogout} />
      ) : (
        <SignUpModal />
      )}
      */}
      <StripeComponent orders= {obj}/>
    </Container>
  );
};

export default Account;
