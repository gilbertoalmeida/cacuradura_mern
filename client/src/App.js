import React, { Fragment, Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";

import HomePage from "./components/HomePage";
import Routes from "./components/routing/Routes";

import { loadUser } from "./actions/authActions";

/* For when I want to translate the app:
https://medium.com/@ryandrewjohnson/adding-multi-language-support-to-your-react-redux-app-cf6e64250050 */

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser()); //being calles everytime the app mounts
    //to check is there is a user
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <div className="App">
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
