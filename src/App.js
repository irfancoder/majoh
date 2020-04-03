import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PaidOrders from "./pages/paidorders";
import Account from "./pages/account";
import Contact from "./pages/contact";
import Home from "./pages/home";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route path="/paidorders" component={PaidOrders} />
          <Route path="/account" component={Account} />
          <Route path="/contact" component={Contact} />
          <Route exact path="/" component={Home} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
