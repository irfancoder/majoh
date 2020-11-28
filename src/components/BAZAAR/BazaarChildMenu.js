import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import LearnMore from "./BazaarLearnMore";
import { OrderConsumer } from "../../utils/contextbazaar";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { isUserLoggedIn } from "../../utils";
import { LocationOn, Business, Star, AccountBalanceRounded } from '@material-ui/icons';
const useStyles = makeStyles({
  root: {
    marginBottom: "1em",
  },
  media: {
    height: "300px",
    
    paddingTop: '56.25%', // 16:9
  },
  price: {
    display: "flex",
    textAlign: "end",
    justifyContent: "flex-end",
    alignItems: "baseline",
    fontSize: "1em"
  },
  minOrder: {
    textAlign: "end",
    fontSize: "10px",
    color: "#a4a4a4"
  },
  buttonAction: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr",
  },
  ratingArea: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  link:{
    textDecoration:"none",
    color:"black",
    "a:hover":{
      textDecoration: "underline"
    }
  },

});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ChildMenu = ({ menu }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const orderSuccess = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenSignUp(false);
  };

  const addOrderToCart = (context) => {
    if (isUserLoggedIn()) {
      context.addOrder(menu);
      orderSuccess();
    } else {
      setOpenSignUp(true);
    }
  };

  return (
    <Card className={classes.root}>
      {/* <a href={`/product/${menu.uid}`}> */}
        <CardMedia className={classes.media}
        image={menu.thumbnail || ""}
        title={menu.item}
        />
          
        
      {/* </a>s */}
      <CardContent>
        <a className={classes.link} href={`/product/${menu.uid}`}>
          <Typography gutterBottom variant="body2" component="h4">
            {menu.item}
          </Typography>
        </a>
        <div className={classes.content}>
          <div style={{ display: "flex" }}>
            {/* <Avatar
              style={{ width: "1em", height: "1em" }}
              src={menu.vendor.profile}
            >
              M
            </Avatar> */}

          </div>
        </div>
        <Typography className={classes.price} variant="h6" component="h2">
          RM {menu.price_min || ""}-{menu.price_max}<Typography className={classes.minOrder} variant="caption" component="p">
            /kg
          </Typography>
        </Typography>
        <Typography gutterBottom className={classes.minOrder} variant="caption" component="p">
          {menu.moq || "-"}kg (Min Order)
          </Typography>

        <Typography className={classes.company} variant="body2" component="h2">
          <Business color="disabled" fontSize="small" /> {menu.vendor.businessName || ""}
        </Typography>
        <Typography variant="body2" component="h2">
          <LocationOn color="disabled" fontSize="small" /> {menu.vendor.location || ""}
        </Typography>
      </CardContent>

      <CardActions className={classes.buttonAction}>
        <OrderConsumer>
          {(context) => {
            return (
              <Fragment>
                <div className={classes.ratingArea}>
                  <Chip icon={<Star />} label="4.8" size="small" />
                  <AccountBalanceRounded style={{ marginLeft: "0.5em" }} fontSize="small" color="disabled" />

                </div>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  href={`/product/${menu.uid}`}
                  disableElevation
                // onClick={() => addOrderToCart(context)}
                >
                  View
                </Button>
                {/* <LearnMore
                  data={menu}
                  context={context}
                  addOrder={addOrderToCart}
                /> */}
              </Fragment>
            );
          }}
        </OrderConsumer>
      </CardActions>

      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {menu.item} is added to your order!
        </Alert>
      </Snackbar>
      <Snackbar open={openSignUp} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Please sign up in Account
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ChildMenu;
