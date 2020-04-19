import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useFirestoreDocData, useFirestore, SuspenseWithPerf } from "reactfire";
import { isUserLoggedIn } from "../../utils";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "0.5em",
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const DeliveryAddress = ({ handleDrawer }) => {
  const classes = useStyles();

  const Address = () => {
    const userRef = useFirestore()
      .collection("stripe_customers")
      .doc(isUserLoggedIn().uid);
    const userData = useFirestoreDocData(userRef);

    return userData.street ? (
      <Typography variant="body1" component="p">
        {userData.street}
        <br />
        <span>
          {userData.postcode}, {userData.city}, {userData.state}
        </span>
      </Typography>
    ) : (
      <Typography variant="body">Fill your address in Account.</Typography>
    );
  };

  return (
    <div className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Delivery Address
        </Typography>
        {isUserLoggedIn() ? (
          <SuspenseWithPerf
            fallback={<p>loading user info...</p>}
            traceId={"load-burrito-status"}
          >
            <Address />
          </SuspenseWithPerf>
        ) : (
          <Typography variant="body" color="primary">
            Sign in/up at Account
          </Typography>
        )}
      </CardContent>
      <CardActions className={classes.action}>
        <Link style={{ textDecoration: "none" }} to="/account">
          <Button onClick={handleDrawer(false)} size="small">
            edit
          </Button>
        </Link>
      </CardActions>
    </div>
  );
};

export default DeliveryAddress;
