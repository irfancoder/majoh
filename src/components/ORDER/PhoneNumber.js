import React from "react";
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

const PhoneNumber = ({ handleDrawer }) => {
  const classes = useStyles();

  const Phone = () => {
    const userRef = useFirestore()
      .collection("stripe_customers")
      .doc(isUserLoggedIn().uid);
    const userData = useFirestoreDocData(userRef);

    return userData.phone ? (
      <Typography variant="body1" component="p">
        {userData.phone}
      </Typography>
    ) : (
      <Typography variant="body" color="primary">
        Fill in your phone number in Account
      </Typography>
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
          Phone Number
        </Typography>

        {isUserLoggedIn() ? (
          <SuspenseWithPerf
            fallback={<p>loading user info...</p>}
            traceId={"load-burrito-status"}
          >
            <Phone />
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

export default PhoneNumber;
