import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getArticlesPT, getArticlesEN } from "../actions/articleActions";

import {
  withLocalize,
  Translate,
  getActiveLanguage
} from "react-localize-redux";

import ArticleFeed from "./articles/ArticleFeed";

const HomePage = ({
  article: { articles },
  getArticlesEN,
  getArticlesPT,
  chosenLanguage
}) => {
  window.scrollTo(0, 0);

  useEffect(() => {
    if (chosenLanguage === "pt") {
      getArticlesPT();
    } else if (chosenLanguage === "en") {
      getArticlesEN();
    }
  }, [getArticlesEN, getArticlesPT, chosenLanguage]);

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
      <ArticleFeed articles={articles} />
    </div>
  );
};

HomePage.propTypes = {
  getArticlesPT: PropTypes.func.isRequired,
  getArticlesEN: PropTypes.func.isRequired,
  getActiveLanguage: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article,
  chosenLanguage: getActiveLanguage(state.localize).code
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getArticlesPT, getArticlesEN, getActiveLanguage }
  )(HomePage)
);
