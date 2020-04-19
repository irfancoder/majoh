import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core";

import LearnMore from "./BazaarLearnMore";
import { OrderConsumer } from "../../utils/contextbazaar";
const useStyles = makeStyles({
  root: {
    marginBottom: "1em",
  },
  media: {
    height: "140px",
  },
  price: {
    textAlign: "end",
  },
  buttonAction: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

const ChildMenu = ({ menu }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={menu.thumbnail || ""} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {menu.item}
          </Typography>
          <div className={classes.content}>
            <div style={{ display: "flex" }}>
              <Avatar
                style={{ width: "1em", height: "1em" }}
                src={menu.vendor.profile}
              >
                M
              </Avatar>
              <Typography
                style={{ marginLeft: "0.5em" }}
                className={classes.price}
                variant="caption"
              >
                {menu.vendor.location || "Sarawak"}
              </Typography>
            </div>
          </div>
          <Typography className={classes.price} variant="body1">
            RM {Number(menu.price).toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonAction}>
        <OrderConsumer>
          {(context) => {
            return (
              <Fragment>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  disableElevation
                  onClick={() => context.addOrder(menu)}
                >
                  Order
                </Button>
                <LearnMore data={menu} addOrder={context.addOrder} />
              </Fragment>
            );
          }}
        </OrderConsumer>
      </CardActions>
    </Card>
  );
};

export default ChildMenu;
