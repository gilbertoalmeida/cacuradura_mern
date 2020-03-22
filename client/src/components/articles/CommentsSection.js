import React, { Fragment } from "react";
import { withLocalize, Translate } from "react-localize-redux";
import Comments from "./Comments";
import AddComment from "./AddComment";

const CommentsSection = ({ articleID }) => {
  return (
    <Fragment>
      <Comments />
      <AddComment articleID={articleID} />
    </Fragment>
  );
};

export default withLocalize(CommentsSection);
