import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";

import PaidOrders from "./pages/paidorders";
import Account from "./pages/account";
import Contact from "./pages/contact";
import Home from "./pages/home";
import Layout from "./components/Layout";
import Header from "./components/Header";

<<<<<<< HEAD
=======
const firebaseConfig = {
  apiKey: "AIzaSyD0rkPJ6JfDKlHDaKhnzSogAJQk-0y47Mk",
  authDomain: "majoh-8eea2.firebaseapp.com",
  databaseURL: "https://majoh-8eea2.firebaseio.com",
  projectId: "majoh-8eea2",
  storageBucket: "majoh-8eea2.appspot.com",
  messagingSenderId: "692387040291",
  appId: "1:692387040291:web:8421eda8a518b95d70b596",
  measurementId: "G-9M3WZRWZNB",
};
>>>>>>> d4088b0c6e26a07628c0defa1fa3ebe8703a577b

const App = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
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
    </FirebaseAppProvider>
  );
};

export default App;
