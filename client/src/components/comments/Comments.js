import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withLocalize, Translate } from "react-localize-redux";
import { Link } from "react-router-dom";
import { getComments } from "../../actions/commentActions";
import { prettyDateHours } from "../../Utils/Utils";
import ReplyToComment from "./ReplyToComment";
import { Collapse } from "reactstrap";

const Comments = ({
  getComments,
  comment: { comments, loading },
  auth: { loggedUser },
  match
}) => {
  useEffect(() => {
    getComments(match.params.id);
  }, [getComments, match.params.id]);

  const [commentIDWithActiveReply, setCommentIDWithActiveReply] = useState("");

  const showReplyInput = commentID => {
    let activeReplyID =
      commentIDWithActiveReply === commentID ? "null" : commentID;
    setCommentIDWithActiveReply(activeReplyID);
  };

  return (
    <div className="comments-section">
      <div className="comments-section__header">Comments</div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="comments-section__comments">
          {Object.keys(comments).map((key, index) => (
            <div key={index} className="comments-section__comments__single">
              <div className="comments-section__comments__single__content">
                <Link to={`/users/${comments[key].author._id}`}>
                  <div className="comments-section__comments__single__content__img">
                    <img
                      src={
                        comments[key].author.picture.length === 0
                          ? "/Assets/no_profile_pic.png"
                          : comments[key].author.picture
                      }
                      alt="profile of the user"
                    />{" "}
                    <div className="comments-section__comments__single__content__img-filter"></div>
                  </div>
                </Link>
                <div className="comments-section__comments__single__content__text">
                  <Link
                    to={`/users/${comments[key].author._id}`}
                    className="user-link link"
                  >
                    {comments[key].author.username}
                  </Link>{" "}
                  {prettyDateHours(comments[key].posted)}
                  <div>{comments[key].comment_text}</div>
                </div>
              </div>
              {loggedUser ? (
                <div
                  onClick={() => {
                    showReplyInput(comments[key]._id);
                  }}
                >
                  Reply
                </div>
              ) : (
                ""
              )}

              <Collapse isOpen={commentIDWithActiveReply === comments[key]._id}>
                <ReplyToComment commentID={comments[key]._id} />
              </Collapse>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Comments.propTypes = {
  getComments: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  comment: state.comment,
  auth: state.auth
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getComments }
  )(Comments)
);

/* { _id, author, posted, comment_text } */

/* answerWithReplyInput === comments[key]._id */
