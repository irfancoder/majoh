import React, { useState, useEffect } from "react";
import OrderEntry from "../components/PAIDORDER/OrderEntry";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  useFirestoreCollectionData,
  useFirestore,
  SuspenseWithPerf,
} from "reactfire";
import { isUserLoggedIn, splitOrderArray } from "../utils";
import Firebase from "../fire";
import { Helmet } from "react-helmet";
import SignUpModal from "../components/SETTINGS/SignUpModal";
import favicon from "../assets/images/favicon.ico";

const useStyle = makeStyles({
  root: {
    maxWidth: "140vh",
    margin: "auto",
  },
  sectionHeader: {
    marginTop: "2em",
    marginBottom: "1em",
  },
});

const PaidOrders = () => {
  const [user, setUser] = useState(isUserLoggedIn());
  const classes = useStyle();

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

  const OrderHistory = () => {
    const ordersRef = useFirestore()
      .collection("stripe_customers")
      .doc(user.uid)
      .collection("paid_orders");

    const ordersData = useFirestoreCollectionData(ordersRef);
    const splitOrders = splitOrderArray(ordersData);

    return (
      <div className={classes.root}>
        <Typography className={classes.sectionHeader} variant="h6">
          Upcoming Order
        </Typography>
        {splitOrders.upcomingOrders.map((order) => {
          return <OrderEntry order={order.orderInfo} />;
        })}

        <Typography className={classes.sectionHeader} variant="h6">
          Order History
        </Typography>
        {splitOrders.pastOrders.map((order) => {
          return <OrderEntry order={order.orderInfo} />;
        })}
      </div>
    );
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Paid Orders | Majoh</title>
        <link rel="canonical" href="http://majoh.com.my/paidorders" />
        <link rel="icon" type="image/ico" href={favicon} sizes="16x16" />
      </Helmet>
      <div>
        {user !== null ? (
          <SuspenseWithPerf
            fallback={<p>loading delicious food</p>}
            traceId={"load-burrito-status"}
          >
            <OrderHistory />
          </SuspenseWithPerf>
        ) : (
          <SignUpModal />
        )}
      </div>
    </>
  );
};

export default PaidOrders;
