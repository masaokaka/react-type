import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { Sidenav } from "./components/organisms/Sidenav";
import Container from "@material-ui/core/Container";
// import ScrollToTop from "./features/ScrollToTop";
import "./App.css";

import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { ItemInfo } from "./components/pages/ItemInfo";
import { Cart } from "./components/pages/Cart";
import { OrderHistory } from "./components/pages/OrderHistory";
import { OrderComp } from "./components/pages/OrderComp";

function App() {
  return (
    <div style={{ minHeight: "100%" }}>
      <Router>
        <Header />
        <Sidenav />
        <Container
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          {/* <ScrollToTop> */}
            <Switch>
              <Route path="/iteminfo/:itemid" exact component={ItemInfo} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/ordercomp/:token" exact component={OrderComp} />
              <Route path="/orderhistory" exact component={OrderHistory} />
              {/* <Route path="/admin" component={AdminHome} /> */}
              <Route path="/" component={Home} />
            </Switch>
          {/* </ScrollToTop> */}
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
