import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getArticle } from "../../actions/articleActions";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

import { withLocalize, Translate } from "react-localize-redux";

const ArticlePage = ({ getArticle, article: { article, loading }, match }) => {
  useEffect(() => {
    getArticle(match.params.id);
  }, [getArticle, match.params.id]);

  //ver o que acontece quando chanma essa página com um id que nao existe
  // the loading page is kept bc article is null

  function addDefaultSrc(ev) {
    ev.target.src = "https://pbs.twimg.com/media/Bw8Kiy4CAAAhcy6.jpg";
  }

  return loading || article === null ? (
    <header>
      <h1>Loading</h1>
    </header>
  ) : (
    <Fragment>
      <header className="App-header"></header>
      {/* header just here to make the space of the authnavbar */}
      <div className="article-page-main-box-element">
        <div className="article-cover">
          <img src={article.feed_img} onError={addDefaultSrc} alt="" />
          <div className="article-cover-img-filter"></div>
          <div className="article-cover-img-text">
            <div className="article-title">{article.title}</div>
            <time dateTime={article.date}>
              <p>
                §}>{" "}
                {new Date(article.date).getDate() +
                  "/" +
                  (new Date(article.date).getMonth() + 1) +
                  "/" +
                  new Date(article.date).getFullYear()}
                ,{" "}
              </p>
              <p>
                <Translate id="article.by"></Translate>{" "}
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
