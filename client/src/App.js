import React, { Fragment, Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { LocalizeProvider } from "react-localize-redux";

import AuthNavBar from "./components/AuthNavBar";
import HomePage from "./components/HomePage";
import Routes from "./components/routing/Routes";

import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser()); //being called everytime the app mounts
    //to check if there is a user
  }

  render() {
    return (
      <Provider store={store}>
        <LocalizeProvider store={store}>
          <Router>
            <Fragment>
              <div className="App">
                <AuthNavBar />
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route component={Routes} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </LocalizeProvider>
      </Provider>
    );
  }
}

export default App;
