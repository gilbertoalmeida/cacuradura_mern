import React, { Fragment } from "react";
import Comments from "./Comments";
import AddComment from "./AddComment";

const CommentsSection = ({ articleID, match }) => {
  return (
    <div className="comments-section">
      <div className="comments-section__header">Comments</div>
      <AddComment articleID={articleID} />
      <Comments match={match} />
    </div>
  );
};

export default CommentsSection;
