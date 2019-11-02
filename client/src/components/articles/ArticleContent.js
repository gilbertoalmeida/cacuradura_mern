import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ArticleContent = ({ article: { _id, date, title } }) => (
  <div>
    <h1>{title}</h1>
  </div>
);

ArticleContent.propTypes = {
  article: PropTypes.object.isRequired
};

export default connect()(ArticleContent);
