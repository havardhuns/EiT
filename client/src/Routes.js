import { Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import React from "react";

const Routes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/informasjon" exact component={About} />
        <Route path="/kontakt" exact component={Contact} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
