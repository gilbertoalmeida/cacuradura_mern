import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getArticle } from "../../actions/articleActions";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import CommentsSection from "../comments/CommentsSection";

import { withLocalize, Translate } from "react-localize-redux";

const ArticlePage = ({ getArticle, article: { article, loading }, match }) => {
  useEffect(() => {
    getArticle(match.params.id);
  }, [getArticle, match.params.id]);

  function addDefaultSrc(ev) {
    ev.target.src = "/Assets/img_load_fail.png";
  }

  return loading ? (
    <header>
      <h1>
        <Translate id="article.loading" />
      </h1>
    </header>
  ) : article === null ? (
    <header>
      <h1>
        <Translate id="article.noarticle" />
      </h1>
    </header>
  ) : (
    <Fragment>
      <header className="App-header"></header>
      {/* header just here to make the space of the authnavbar */}
      <div className="article-page-main-box-element">
        <div className="article-cover">
          <img
            src={article.feed_img}
            onError={addDefaultSrc}
            alt="cover of the article"
            style={{
              display: article.feed_img ? "block" : "none"
            }}
          />
          <div
            className="article-cover-img-filter"
            style={{
              display: article.feed_img ? "block" : "none"
            }}
          ></div>
          <div
            className={`article-cover-${
              article.feed_img ? "img-text" : "text"
            } `}
          >
            <div className="article-title">{article.title}</div>
            <time dateTime={article.date}>
              <p>
                §}>{" "}
                {new Date(article.date).getDate() +
                  "/" +
                  (new Date(article.date).getMonth() + 1) +
                  "/" +
                  new Date(article.date).getFullYear()}
              </p>
              <p>
                <Translate id="article.by" />{" "}
                <Link
                  to={`/users/${article.author._id}`}
                  className="user-link link"
                >
                  {article.author.username}
                </Link>
              </p>
            </time>
          </div>
          <div className="article-body">{ReactHtmlParser(article.body)}</div>
        </div>
        <CommentsSection articleID={match.params.id} match={match} />
      </div>
    </Fragment>
  );
};

ArticlePage.propTypes = {
  getArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getArticle }
  )(ArticlePage)
);
