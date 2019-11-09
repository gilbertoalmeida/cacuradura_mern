import React, { Component } from "react";

import ArticleFeed from "./articles/ArticleFeed";
import AddArticleModal from "./articles/AddArticleModal";

class HomePage extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1>
            Cacura<span>Dura</span>
          </h1>
          <h2>
            Cacuras em formação
            <br />
            Acompanhe essa metamorfose
          </h2>
        </header>
        <AddArticleModal />
        <ArticleFeed />
      </div>
    );
  }
}

export default HomePage;
