import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
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

        <Typography variant="body2" component="p">
          +6013-688 7507
          <br />
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <Button size="small">edit</Button>
      </CardActions>
    </Card>
  );
};

export default PhoneNumber;
