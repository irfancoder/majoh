import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import PaidOrders from "./pages/paidorders";
import Account from "./pages/account";
import Contact from "./pages/contact";
import Home from "./pages/home";
import PrivacyPolicy from "./pages/privacypolicy";
import RegisterVendor from "./pages/register-vendor";
import Product from './pages/product';
import Layout from "./components/Layout";
import color from "./styles/color";

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

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: color.red,
    },
  },
});

const App = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Router>
        <ThemeProvider theme={theme}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/paidorders" component={PaidOrders} />
              <Route path="/account" component={Account} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacypolicy" component={PrivacyPolicy} />
              <Route path="/register-vendor" component={RegisterVendor} />
              <Route path="/product/:id" 
                render={(props)=><Product {...props}/>}
              //component={Product}
               />
            </Switch>
          </Layout>
        </ThemeProvider>
      </Router>
    </FirebaseAppProvider>
  );
};

export default App;
