import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticlePage from "../articles/ArticlePage";
import AddArticlePage from "../articles/AddArticlePage";
import UserPage from "../users/UserPage";
import NotFound from "../NotFound";

const Routes = () => {
  return (
    <section>
      <Switch>
        <Route exact path="/articles/addarticle" component={AddArticlePage} />
        <Route exact path="/articles/:id" component={ArticlePage} />
        <Route exact path="/users/:id" component={UserPage} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
