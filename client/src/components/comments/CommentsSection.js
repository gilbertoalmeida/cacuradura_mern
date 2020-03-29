import React from "react";
import Comments from "./Comments";
import AddComment from "./AddComment";
import { withLocalize, Translate } from "react-localize-redux";

const CommentsSection = ({ articleID, match }) => {
  return (
    <div className="comments-section">
      <div className="comments-section__header">
        <Translate id="comments_section.header" />
      </div>
      <AddComment articleID={articleID} />
      <Comments match={match} />
    </div>
  );
};

export default withLocalize(CommentsSection);
