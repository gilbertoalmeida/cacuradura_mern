import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticlePage from "../articles/ArticlePage";
import AddArticlePage from "../articles/AddArticlePage";
import UserPage from "../users/UserPage";
import EditProfile from "../auth/EditProfile";
import NotFound from "../NotFound";
import About from "../About";
import PrivacyPolicy from "../PrivacyPolicy";

const Routes = () => {
  return (
    <section>
      <Switch>
        <Route exact path="/articles/addarticle" component={AddArticlePage} />
        <Route exact path="/articles/:id" component={ArticlePage} />
        <Route exact path="/users/edit_profile" component={EditProfile} />
        <Route exact path="/users/:username" component={UserPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/privacy_policy" component={PrivacyPolicy} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
