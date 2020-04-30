import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Table,
  MenuItem,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  NativeSelect,
} from "@material-ui/core";

import MuiTableCell from "@material-ui/core/TableCell";
// import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { OrderConsumer } from "../../utils/contextbazaar";
import { getMaxNumberofOrders } from "../../utils";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
    marginBottom: "2em",
  },
  qty: {
    maxWidth: "3em",
    textDecoration: "none",
    textAlign: "right",
  },
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
});

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

const OrderList = ({ order }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="center">Qty</TableCell>

            <TableCell align="right">Unit (RM)</TableCell>
            <TableCell align="right">Price (RM)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          style={{
            minHeight: "60vh",
            width: "100%",
          }}
        >
          {order.length > 0 ? (
            order.map((item, index) => {
              return <OrderItem key={index} item={item} classes={classes} />;
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                style={{
                  textAlign: "center",
                  color: "#a4a4a4",
                  boxSizing: "border-box",
                  padding: "6em",
                }}
              >
                You have no orders yet!
              </TableCell>
            </TableRow>
          )}
          <OrderConsumer>
            {(context) => {
              return (
                <React.Fragment>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Divider />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <TableCell rowSpan={3} /> */}
                    <TableCell>Subtotal (RM)</TableCell>
                    <TableCell colSpan={3} align="right">
                      RM {context.invoice.subtotal}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Service charge (RM)</TableCell>
                    {/* <TableCell colSpan={2} align="right">
                      {context.invoice.subtotal > 15
                        ? `${context.invoice.serviceRate * 100} %`
                        : `RM ${context.invoice.serviceRate}`} 
                    </TableCell>*/}
                    <TableCell colSpan={3} align="right">
                      RM {context.invoice.serviceCharge}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total (RM)</TableCell>
                    <TableCell colSpan={3} align="right">
                      RM {context.invoice.total}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            }}
          </OrderConsumer>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const OrderItem = ({ item, classes }) => {
  return (
    <OrderConsumer>
      {(context) => {
        return (
          <TableRow key={item.item}>
            <TableCell>{item.item}</TableCell>
            <TableCell align="center">
              <NativeSelect
                name="quantity"
                value={item.qty}
                variant="outlined"
                onChange={(e) =>
                  context.editOrder({ item: item, qty: e.target.value })
                }
                defaultValue="1"
              >
                {getMaxNumberofOrders().map((value) => {
                  return (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  );
                })}
              </NativeSelect>
              {/* <TextField
                className={classes.qty}
                id="filled-number"
                type="number"
                size="small"
                defaultValue={item.qty}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                autoFocus
                InputProps={{
                  classes,
                  inputProps: {
                    max: 10,
                    min: 0,
                  },
                }}
                onChange={(e) =>
                  context.editOrder({ item: item, qty: e.target.value })
                }
              /> */}
            </TableCell>
            <TableCell align="right">{ccyFormat(item.price)}</TableCell>
            <TableCell align="right">{ccyFormat(item.total)}</TableCell>
          </TableRow>
        );
      }}
    </OrderConsumer>
  );
};

export default OrderList;
