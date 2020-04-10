import React, { Fragment } from "react";

const LoadingArticlePage = () => {
  return (
    <Fragment>
      <header className="App-header"></header>
      <div
        style={{ opacity: "0.45" }}
        className="article-page-main-box-element"
      >
        <div className="article-cover">
          <img
            src="https://i.imgur.com/JqJnHVu.png"
            alt="cover of the article"
          />
          <div className="article-cover-img-filter"></div>
          <div className="article-cover-img-text-loading">
            <div className="article-title">&nbsp;</div>
            <div className="article-title">&nbsp;</div>
            <div className="article-time">&nbsp;</div>
            <div className="article-author">&nbsp;</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoadingArticlePage;
