import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticlePage from "../articles/ArticlePage";
import AddArticlePage from "../articles/AddArticlePage";
import EditArticlePage from "../articles/EditArticlePage";
import UserPage from "../users/UserPage";
import EditProfile from "../auth/EditProfile";
import NotFound from "../NotFound";
import About from "../About";
import PrivacyPolicy from "../PrivacyPolicy";

const Routes = () => {
  return (
    <section>
      <Switch>
        <Route exact path="/articles/add-article" component={AddArticlePage} />
        <Route
          exact
          path="/articles/edit-article/:id"
          component={EditArticlePage}
        />
        <Route exact path="/articles/:id" component={ArticlePage} />
        <Route exact path="/users/edit-profile" component={EditProfile} />
        <Route exact path="/users/:username" component={UserPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
