import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withLocalize, Translate } from "react-localize-redux";
import { Link } from "react-router-dom";
import { getComments } from "../../actions/commentActions";
import { getUser } from "../../actions/userActions";
import { prettyDateHours } from "../../Utils/Utils";

const Comments = ({
  getComments,
  comment: { comments, loading },
  match,
  getUser,
  user: { profile_pictures }
}) => {
  useEffect(() => {
    getComments(match.params.id);
  }, [getComments, match.params.id]);

  return loading ? (
    <div>loading</div>
  ) : (
    <div className="comments-section">
      <div className="comments-section__header">Comments</div>
      <div className="comments-section__comments">
        {comments.map(({ _id, author, posted, comment_text }) => (
          <div key={_id} className="comments-section__comments__single">
            <div className="comments-section__comments__single__img">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/A_pangolin_in_defensive_posture%2C_Horniman_Museum%2C_London.jpg/1280px-A_pangolin_in_defensive_posture%2C_Horniman_Museum%2C_London.jpg"
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
    </div>
  );
};

Comments.propTypes = {
  getComments: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  comment: state.comment,
  user: state.user
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getComments, getUser }
  )(Comments)
);
