import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LearnMore from "./LearnMore";
import { OrderConsumer } from "../../utils/context";
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
});

const ChildMenu = ({ menu }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={menu.thumbnail}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {menu.item}
          </Typography>
          <Typography className={classes.price} variant="body1" component="h2">
            RM {menu.price} /pax
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
