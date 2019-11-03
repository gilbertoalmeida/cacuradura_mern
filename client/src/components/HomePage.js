import React, { Component } from "react";

import ArticleFeed from "./articles/ArticleFeed";

class HomePage extends Component {
  render() {
    return (
      <div>
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
        <ArticleFeed />
      </div>
    );
  }
}

export default HomePage;
