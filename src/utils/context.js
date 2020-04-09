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

  function createRow(item, qty, price) {
    const cUnit = Number(price);
    const total = priceRow(qty, cUnit);

    return { item, qty, price, total };
  }
  const TAX_RATE = 0.0;

  const invoiceSubtotal = subtotal(orderState);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
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
          tax: ccyFormat(invoiceTaxes),
          total: ccyFormat(invoiceTotal),
        },
        addOrder: (item) => {
          let i = orderState.findIndex((o) => o.item === item.item);
          if (i === -1) {
            setOrderState([
              ...orderState,
              createRow(item.item, 1, Number(item.price)),
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
              Number(item.price)
            );
            console.log({ prevOrder, test: "A" });
            setOrderState(prevOrder);
          } else {
            prevOrder.splice(i, 1);
            console.log({ prevOrder, test: "B" });
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
