import React, { Fragment, Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";

import AuthNavBar from "./components/AuthNavBar";
import HomePage from "./components/HomePage";
import Routes from "./components/routing/Routes";

import { loadUser } from "./actions/authActions";

/* For when I want to translate the app:
https://medium.com/@ryandrewjohnson/adding-multi-language-support-to-your-react-redux-app-cf6e64250050 */

import "bootstrap/dist/css/bootstrap.min.css";
import "draft-js/dist/Draft.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser()); //being calles everytime the app mounts
    //to check if there is a user
  }

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
