import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticlePage from "../articles/ArticlePage";
import NotFound from "../NotFound";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/articles" component={ArticlePage} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
