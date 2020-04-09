import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
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
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const PhoneNumber = () => {
  const classes = useStyles();

  const Phone = () => {
    const userRef = useFirestore()
      .collection("stripe_customers")
      .doc(isUserLoggedIn().uid);
    const userData = useFirestoreDocData(userRef);

    return userData.phone ? (
      <Typography variant="body2" component="p">
        {userData.phone}
      </Typography>
    ) : (
      <Typography variant="body">Fill your address in Account.</Typography>
    );
  };

  return (
    <Card className={classes.root}>
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
          <Typography variant="body">Sign in/up at Account</Typography>
        )}
      </CardContent>
      <CardActions className={classes.action}>
        <Link to="/account">
          <Button size="small">edit</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PhoneNumber;
