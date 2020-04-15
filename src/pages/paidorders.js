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
import SignUpModal from "../components/SETTINGS/SignUpModal";

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
  );
};

// String.prototype.toDate = function (format) {
//   var normalized = this.replace(/[^a-zA-Z0-9]/g, "-");
//   var normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
//   var formatItems = normalizedFormat.split("-");
//   var dateItems = normalized.split("-");

//   var monthIndex = formatItems.indexOf("mm");
//   var dayIndex = formatItems.indexOf("dd");
//   var yearIndex = formatItems.indexOf("yyyy");
//   var hourIndex = formatItems.indexOf("hh");
//   var minutesIndex = formatItems.indexOf("ii");
//   var secondsIndex = formatItems.indexOf("ss");

//   var today = new Date();

//   var year = yearIndex > -1 ? dateItems[yearIndex] : today.getFullYear();
//   var month =
//     monthIndex > -1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1;
//   var day = dayIndex > -1 ? dateItems[dayIndex] : today.getDate();

//   var hour = hourIndex > -1 ? dateItems[hourIndex] : today.getHours();
//   var minute = minutesIndex > -1 ? dateItems[minutesIndex] : today.getMinutes();
//   var second = secondsIndex > -1 ? dateItems[secondsIndex] : today.getSeconds();

//   return new Date(year, month, day, hour, minute, second);
// };

export default PaidOrders;
