import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withLocalize, Translate } from "react-localize-redux";
import { Link } from "react-router-dom";
import { getComments } from "../../actions/commentActions";
import { prettyDateHours } from "../../Utils/Utils";

const Comments = ({ getComments, comment: { comments, loading }, match }) => {
  useEffect(() => {
    getComments(match.params.id);
  }, [getComments, match.params.id]);

  return (
    <div className="comments-section">
      <div className="comments-section__header">Comments</div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="comments-section__comments">
          {comments.map(({ _id, author, posted, comment_text }) => (
            <div key={_id} className="comments-section__comments__single">
              <div className="comments-section__comments__single__img">
                <img
                  src={
                    author.picture.length === 0
                      ? "/Assets/no_profile_pic.png"
                      : author.picture
                  }
                  alt="profile of the user"
                />
                <div className="comments-section__comments__single__img-filter"></div>
              </div>
              <div className="comments-section__comments__single__text">
                <Link to={`/users/${author._id}`} className="user-link link">
                  {author.username}
                </Link>{" "}
                {prettyDateHours(posted)}
                <div>{comment_text}</div>
              </div>
            </div>
          ))}
        </div>
      )}
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
