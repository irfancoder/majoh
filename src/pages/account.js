import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import SettingsCard from "../components/SETTINGS/SettingsCard";
import Button from "@material-ui/core/Button";
import SignUpModal from "../components/SETTINGS/SignUpModal";
import SignIn from "../components/SETTINGS/SignIn";
import MuiContainer from "@material-ui/core/Container";
import { isUserLoggedIn, signOutUser } from "../utils/index";
import Firebase from "../fire";
import StripeComponent from "../components/StripeInterface";

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
  /*
  const obj = {
    mode: 'payment',
    customer: 'cus_H5xdctLSPKqvTm',
    metadata: {customerEmail: 'marcosjconcon@gmail.com',deliveryDate: '13/04/97', deliveryAddress: 'tress', phoneNo: 666, Name: 'Big Dick', uID: 'F4cobyo9JZZXw2Q4xTgV6VDaJJw1'},
    order_items: [
      {
        currency: "myr",
        quantity: 3,
        amount: 15000,
        name: "nasi vagene",
        description: "good all stuff",
        images: [
          "https://i.pinimg.com/originals/ca/46/e0/ca46e012af90c5911733e3b0034ca385.jpg",
        ],
      },
      {
        currency: "myr",
        quantity: 7,
        amount: 15000,
        name: "nasi penis",
        description: "good not stuff",
        images: [
          "https://i.pinimg.com/originals/ca/46/e0/ca46e012af90c5911733e3b0034ca385.jpg",
        ],
      },
    ],
  };
*/  
  return (
    <Container>
    {/* <CashDelivery orders={obj} />*/}
      user !== null ? (
        <SettingsCard logout={handleUserLogout} />
      ) : (
        <SignUpModal />
      )
    </Container>
  );
};

export default Account;
