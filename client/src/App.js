import React, { Component } from "react";
import { Provider } from "react-redux";
import "./App.css";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1>
              Cacura<span>Dura</span>
            </h1>
            <p id="maindescription">
              Cacuras em formação
              <br />
              Acompanhe essa metamorfose
            </p>
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
