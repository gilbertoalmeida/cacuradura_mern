import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getArticlesPT, getArticlesEN } from "../actions/articleActions";

import { withLocalize, Translate } from "react-localize-redux";

import ArticleFeed from "./articles/ArticleFeed";

const HomePage = ({
  activeLanguage,
  article: { articles },
  getArticlesEN,
  getArticlesPT
}) => {
  window.scrollTo(0, 0);

  /* Using this custom hook to know if it is the first render. */
  const useIsFirstRender = () => {
    const isFirstRenderRef = useRef(true);
    useEffect(() => {
      isFirstRenderRef.current = false;
    }, []);
    return isFirstRenderRef.current;
  };

  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (isFirstRender) {
    } else {
      if (activeLanguage.code === "pt") {
        getArticlesPT();
      } else if (activeLanguage.code === "en") {
        getArticlesEN();
      }
    }
  }, [getArticlesEN, getArticlesPT, activeLanguage, isFirstRender]);

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
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getArticlesPT, getArticlesEN }
  )(HomePage)
);
