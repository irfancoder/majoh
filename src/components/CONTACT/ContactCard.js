import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import InputContact from "./InputContact";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "120vh",
    flexGrow: 1,
    margin: "auto",
  },
}));

const ContactCard = () => {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const classes = useStyles();

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        align="left"
        variant="h6"
        color="textPrimary"
        gutterBottom
      >
        Contact
      </Typography>
      <Card className={classes.root}>
        <CardContent>
          {/*Pass in to InputText Later */}
          <InputContact handleInput={handleInput} />
        </CardContent>

        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button onClick={null}>Submit</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ContactCard;
