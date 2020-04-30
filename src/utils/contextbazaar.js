import React, { useState, createContext } from "react";

const OrderContext = createContext();

const OrderConsumer = OrderContext.Consumer;

const OrderProvider = (props) => {
  const [orderState, setOrderState] = useState([]);

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }

  function createRow(item, qty, price, vendor) {
    const cUnit = Number(price);
    const total = priceRow(qty, cUnit);

    let orderItem = {
      item: item,
      qty: qty,
      price: price,
      total: total,
      vendor: vendor,
    };
    console.log(orderItem);

    return orderItem;
  }
  // const PERCENT_RATE = 0.1;
  // const FLAT_RATE = 1.5;
  const invoiceSubtotal = subtotal(orderState);
  // const SERVICE_CHARGE = 0.2 * invoiceSubtotal + 1;
  const SERVICE_CHARGE = 3.0;
  const invoiceTaxes = SERVICE_CHARGE;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  function subtotal(items) {
    return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
  }

  return (
    <OrderContext.Provider
      value={{
        order: orderState,
        invoice: {
          subtotal: ccyFormat(invoiceSubtotal),
          // serviceRate:
          //   invoiceSubtotal > 15 ? PERCENT_RATE : ccyFormat(FLAT_RATE),
          serviceCharge: ccyFormat(invoiceTaxes),
          total: ccyFormat(invoiceTotal),
        },
        addOrder: (item) => {
          let i = orderState.findIndex((o) => o.item === item.item);
          if (i === -1) {
            setOrderState([
              ...orderState,
              createRow(item.item, 1, Number(item.price), item.vendor),
            ]);
          }
        },
        editOrder: ({ item, qty }) => {
          let prevOrder = [...orderState];
          let i = orderState.findIndex((o) => o.item === item.item);
          if (Number(qty) !== 0) {
            prevOrder[i] = createRow(
              item.item,
              Number(qty),
              Number(item.price),
              item.vendor
            );
            setOrderState(prevOrder);
          } else {
            prevOrder.splice(i, 1);
            setOrderState(prevOrder);
          }
        },
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderConsumer };
