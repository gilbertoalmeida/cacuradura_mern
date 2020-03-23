import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withLocalize, Translate } from "react-localize-redux";
import { getComments } from "../../actions/commentActions";

const Comments = ({ getComments, comment: { comments, loading }, match }) => {
  useEffect(() => {
    getComments(match.params.id);
  }, [getComments, match.params.id]);

  return loading ? (
    <div>loading</div>
  ) : (
    <div className="comments-section">
      <div className="comments-section__header">Comments</div>
      {comments.map(({ _id, author: { username }, posted, comment_text }) => (
        <div key={_id} className="comments-section__single-comment">
          <div>{comment_text}</div>
          <div>
            Por {username}, {posted}
          </div>
        </div>
      ))}
    </div>
  );
};

Comments.propTypes = {
  getComments: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  comment: state.comment
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getComments }
  )(Comments)
);
