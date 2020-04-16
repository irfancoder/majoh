import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import CardContent from "@material-ui/core/CardContent";
import OrderItem from "./OrderItem";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: "0.5em",
  },
  content: {
    display: "flex",
    flexDirection: "row",
  },
  order_info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  order_item: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
});

const getTotal = (orders) => {
  let total = 0;
  orders.forEach((order) => {
    total += order.amount;
  });
  total = total / 100;
  return total.toFixed(2);
};

const History = ({ order }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.order_info}>
          <Typography color="textSecondary" variant="overline" gutterBottom>
            ID#{order.id.substr(order.id.length - 6)}
          </Typography>
        </div>
        <div className={classes.order_item}>
          {order.display_items.map((item, index) => {
            return <OrderItem item={item} key={index} />;
          })}
        </div>
        <div className={classes.order_info}>
          <Typography color="textSecondary" variant="caption">
            Delivery: {order.metadata.deliveryDate}
          </Typography>
          <Typography
            className={classes.order_id}
            color="textSecondary"
            variant="subtitle1"
          >
            RM {getTotal(order.display_items)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default History;
