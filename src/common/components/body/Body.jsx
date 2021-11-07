import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Body.scss";
import Other from "../../../pages/other"
import Home from "../../../pages/home";

export const Body = () => {
    return (
      <div className="bodyLayout">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/policy/:id" component={Other} />
        </Switch>
      </div>
    );
  };