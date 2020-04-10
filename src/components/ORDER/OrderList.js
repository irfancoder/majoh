import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { OrderConsumer } from "../../utils/context";
import Divider from "@material-ui/core/Divider";

const TAX_RATE = 0.0;

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

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

// function subtotal(items) {
//   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const OrderList = ({ order }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Qty</TableCell>
            <TableCell>Item</TableCell>

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
            order.map((item) => {
              return <OrderItem item={item} classes={classes} />;
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                style={{
                  textAlign: "center",

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
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal (RM)</TableCell>
                    <TableCell align="right">
                      {context.invoice.subtotal}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                      0
                    )} %`}</TableCell>
                    <TableCell align="right">{context.invoice.tax}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total (RM)</TableCell>
                    <TableCell align="right">{context.invoice.total}</TableCell>
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
            <TableCell align="center">
              <TextField
                className={classes.qty}
                id="filled-number"
                type="number"
                size="small"
                defaultValue={item.qty}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
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
              />
              x
            </TableCell>
            <TableCell>{item.item}</TableCell>
            <TableCell align="right">{item.price}</TableCell>
            <TableCell align="right">{ccyFormat(item.total)}</TableCell>
          </TableRow>
        );
      }}
    </OrderConsumer>
  );
};

export default OrderList;
