import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getArticle } from "../../actions/articleActions";
import PropTypes from "prop-types";

const ArticlePage = ({ getArticle, article: { article, loading }, match }) => {
  useEffect(() => {
    getArticle(match.params.id);
  }, [getArticle, match.params.id]);

  //ver o que acontece quando chanma essa página com um id que nao existe

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
        <time datetime={article.date}>
          <b>
            §}> {article.date}, por {article.author.username}
          </b>
        </time>
        <Link className="link" to={`/articles/${article._id}`}>
          <img
            src="/Assets/a-cacurice-vem.png"
            alt="Foto de um girassol murcho com o scripting de'A cacurice vem' por cima"
          ></img>
        </Link>
        <br />
        <p>{article.body}</p>
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
