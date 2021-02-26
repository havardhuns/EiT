import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import About from "./components/About";
import React from "react";

const Routes = () => {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/users" exact component={Users} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default Routes;
