import React, { Fragment } from "react";
import { withLocalize, Translate } from "react-localize-redux";
import { Link } from "react-router-dom";

const ArticleNotFound = () => {
  window.scrollTo(0, 0);
  return (
    <Fragment>
      <header className="App-header"></header>
      {/* header just here to make the space of the authnavbar */}
      <div className="article-not-found-main-box-element">
        <div className="article-not-found-title">
          <Translate id="article.article_not_found" />
        </div>
        <div className="article-not-found-body">
          <Translate id="article.article_not_found_text" />
          <p style={{ marginTop: "40px", width: "100%", textAlign: "center" }}>
            <Link to="/" className="general-pink-link">
              <Translate id="general.back_to_homepage" />
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default withLocalize(ArticleNotFound);
