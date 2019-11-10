import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getArticle } from "../../actions/articleActions";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

const ArticlePage = ({ getArticle, article: { article, loading }, match }) => {
  useEffect(() => {
    getArticle(match.params.id);
  }, [getArticle, match.params.id]);

  //ver o que acontece quando chanma essa página com um id que nao existe
  // the loading page is kept bc article is null

  return loading || article === null ? (
    <h1>Loading</h1>
  ) : (
    <Fragment>
      <h1>
        um <span>artigo</span>
      </h1>
      <div className="main-box-element">
        <Link to={`/articles/${article._id}`} className="article-title link">
          {article.title}
        </Link>
        <time dateTime={article.date}>
          <b>
            §}>{" "}
            {new Date(article.date).getDate() +
              "/" +
              (new Date(article.date).getMonth() + 1) +
              "/" +
              new Date(article.date).getFullYear()}
            , por{" "}
            <Link
              to={`/users/${article.author._id}`}
              className="user-link link"
            >
              {article.author.username}
            </Link>
          </b>
        </time>
        <Link className="link" to={`/articles/${article._id}`}>
          <img
            src="/Assets/a-cacurice-vem.png"
            alt="Foto de um girassol murcho com o scripting de'A cacurice vem' por cima"
          ></img>
        </Link>
        <br />
        <div>{ReactHtmlParser(article.body)}</div>
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

export default connect(
  mapStateToProps,
  { getArticle }
)(ArticlePage);
