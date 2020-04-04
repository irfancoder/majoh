import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PaidOrders from "./pages/paidorders";
import Account from "./pages/account";
import Contact from "./pages/contact";
import Home from "./pages/home";
import Layout from "./components/Layout";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/paidorders" component={PaidOrders} />
          <Route path="/account" component={Account} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
