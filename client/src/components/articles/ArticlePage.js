import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getArticle } from "../../actions/articleActions";
import PropTypes from "prop-types";

const ArticlePage = ({ getArticle, article: { article, loading }, match }) => {
  useEffect(() => {
    getArticle(match.params.id);
  }, [getArticle, match.params.id]);

  //ver o que acontece quando chanma essa página com um id que nao existe

  return (
    <Fragment>
      <h1>Página de um artigo</h1>
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
