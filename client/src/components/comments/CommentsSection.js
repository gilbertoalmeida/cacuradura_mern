import React, { Fragment } from "react";
import Comments from "./Comments";
import AddComment from "./AddComment";

const CommentsSection = ({ articleID, match }) => {
  return (
    <Fragment>
      <Comments match={match} />
      <AddComment articleID={articleID} />
    </Fragment>
  );
};

export default CommentsSection;
