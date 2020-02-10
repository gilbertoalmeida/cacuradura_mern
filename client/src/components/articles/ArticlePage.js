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
    ev.target.src =
      "https://lh3.googleusercontent.com/g1geQPY-XS-ULU80VXCyAlG2aqEwkIPdbAZcfdLlMHqdqcU36658P6v_beNBW7UTN9Q5zqVbsGr87NjqtiNh8aXqAtllrsTrE47fSpEgh1eCpK4FgjaftXSS0ijWG43RQhrZVVCTCKtC25gEpg43Ag_CnjSlZzPZmtJW0Mxwf0LkBfhbZt690KngyeWt-6uf2o8zjl2hxZAOxIARUl-NiXaIlZ0nlM_s-mA_OOSr89itUv7e5um2zFGyD39X6wUrulHjttqyaNRDMCnNbNAZ_LGsYQo2zR5CnjZhiZJWt0PkAJ80Ui7GerZLUYw4TQuwSnkT9ipozb3E0V7s9I64-2ZqE5-zoHbPoqpEdMZ_6NI-TitQA0jFMttcVdfiVkXhbT4JM-SSdW_p99iwM0uzRTgknq3mXdYKbTvEDX3xS-n55UhTk7qOz5OIZCVAO54q4B4paEyxuaByJaSOSPyj6Yud0qf9U-VtrJ2bbqrGnvGhoFBce0sEUSyxCzVm5_iqv80iKf3gXpeeyaImoVorCUBDqiCqbrSATKoLqcDLqsbvbWSK44-SnMmB39oMgHfs3Riab50d0faSQfDRAXfinkynILVcoeTiwtRcxt8rEfi_fpbzpXQeyYFg9eHFHkHgNUTE47ITCxKNGdehoktpm5COQ-QXG4rA6WFL1fqFaMjh5CaIv0MFNA=w1319-h660-no";
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
