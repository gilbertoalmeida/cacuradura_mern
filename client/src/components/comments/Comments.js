import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withLocalize } from "react-localize-redux";
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

  const [
    commentIDWithActiveReplyInput,
    setCommentIDWithActiveReplyInput
  ] = useState("");
  const [commentIDWithActiveReplies, setCommentIDWithActiveReplies] = useState(
    ""
  );

  const showReplyInput = commentID => {
    let activeReplyInputID =
      commentIDWithActiveReplyInput === commentID ? "null" : commentID;
    setCommentIDWithActiveReplyInput(activeReplyInputID);
  };

  const showReplies = commentID => {
    let activeRepliesID =
      commentIDWithActiveReplies === commentID ? "null" : commentID;
    setCommentIDWithActiveReplies(activeRepliesID);
  };

  return (
    <div className="comments-section-comments">
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="comments-section__comments">
          {Object.keys(comments)
            .reverse()
            .map((key, index) => (
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

                <div className="comments-section__comments__single__buttons">
                  <div
                    className="comments-section__comments__single__show-replies-button"
                    onClick={() => {
                      showReplies(comments[key]._id);
                    }}
                  >
                    {`Show replies (${comments[key].replies.length})`}
                  </div>
                  <div>|</div>
                  <div
                    className="comments-section__comments__single__reply-button"
                    onClick={() => {
                      showReplyInput(comments[key]._id);
                    }}
                  >
                    Reply
                  </div>
                </div>

                <Collapse
                  isOpen={commentIDWithActiveReplyInput === comments[key]._id}
                >
                  {loggedUser ? (
                    <ReplyToComment commentID={comments[key]._id} />
                  ) : (
                    <div className="comments-section__comments__single__no-auth">
                      Login to reply
                    </div>
                  )}
                </Collapse>
                <Collapse
                  isOpen={commentIDWithActiveReplies === comments[key]._id}
                >
                  <div className="comments-section__comments__replies">
                    {comments[key].replies.map(
                      ({ author, reply_text, posted }) => (
                        <div className="comments-section__comments__replies__single">
                          <div className="comments-section__comments__replies__single__content">
                            <Link to={`/users/${author._id}`}>
                              <div className="comments-section__comments__replies__single__content__img">
                                <img
                                  src={
                                    author.picture.length === 0
                                      ? "/Assets/no_profile_pic.png"
                                      : author.picture
                                  }
                                  alt="profile of the user"
                                />{" "}
                                <div className="comments-section__comments__replies__single__content__img-filter"></div>
                              </div>
                            </Link>
                            <div className="comments-section__comments__replies__single__content__text">
                              <Link
                                to={`/users/${author._id}`}
                                className="user-link link"
                              >
                                {author.username}
                              </Link>{" "}
                              {prettyDateHours(posted)}
                              <div>{reply_text}</div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
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
