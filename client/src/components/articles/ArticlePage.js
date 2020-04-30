import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getArticle } from "../../actions/articleActions";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import CommentsSection from "../comments/CommentsSection";
import { prettyDateNoHours } from "../../Utils/Utils";
import { withLocalize, Translate } from "react-localize-redux";
import { addErrorSrc } from "../../Utils/Utils";

import LoadingArticlePage from "./LoadingArticlePage";
import ArticleNotFound from "./ArticleNotFound";

const ArticlePage = ({
  getArticle,
  article: { article, loading },
  auth: { isAuthenticated, loggedUser },
  match
}) => {
  useEffect(() => {
    getArticle(match.params.id);
    window.scrollTo(0, 0);
  }, [getArticle, match.params.id]);

  return loading && !article ? (
    <LoadingArticlePage />
  ) : !article ? (
    <ArticleNotFound />
  ) : (
    <Fragment>
      <header className="App-header"></header>
      {/* header just here to make the space of the authnavbar */}
      <div className="article-page-main-box-element">
        <div className="article-cover">
          <img
            src={article.coverImg}
            onError={addErrorSrc}
            alt="cover of the article"
            style={{
              display: article.coverImg ? "block" : "none"
            }}
            className="article-cover__img"
          />
          <div
            className="article-cover-img-filter"
            style={{
              display: article.coverImg ? "block" : "none"
            }}
          ></div>
          <div
            className={`article-cover-${
              article.coverImg ? "img-text" : "text"
            } `}
          >
            <div className="article-title">{article.title}</div>
            <time dateTime={article.date}>
              <p>§}> {prettyDateNoHours(article.date)}</p>
              {article.editDate && (
                <p>
                  <i>
                    <Translate id="article.edited_on" />{" "}
                    {prettyDateNoHours(article.editDate)}
                  </i>
                </p>
              )}
              <p>
                <Translate id="article.by" />{" "}
                <Link
                  to={`/users/${article.author.username}`}
                  className="user-link link"
                >
                  {article.author.username}
                </Link>
              </p>
            </time>
          </div>
          {isAuthenticated && loggedUser._id === article.author._id && (
            <div className="article-cover-icons">
              <Link to={`/articles/edit-article/${article._id}`}>
                <img
                  src="/Assets/edit_icon.png"
                  alt="edit icon"
                  width="20px"
                  height="20px"
                />
              </Link>
            </div>
          )}
        </div>
        <div className="article-body">{ReactHtmlParser(article.body)}</div>
        <CommentsSection articleID={match.params.id} match={match} />
      </div>
    </Fragment>
  );
};

ArticlePage.propTypes = {
  getArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article,
  auth: state.auth
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getArticle }
  )(ArticlePage)
);
