import React, { Component } from "react";

import { withLocalize, Translate } from "react-localize-redux";

import ArticleFeed from "./articles/ArticleFeed";

class HomePage extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1>
            Cacura<span>Dura</span>
          </h1>
          <h2>
            <Translate id="header.call1" />
            <br />
            <Translate id="header.call2" />
          </h2>
        </header>
        <ArticleFeed />
      </div>
    );
  }
}

export default withLocalize(HomePage);
