import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withLocalize, Translate } from "react-localize-redux";
import { Link } from "react-router-dom";
import { getComments } from "../../actions/commentActions";
import { prettyDateHours } from "../../Utils/Utils";
import ReplyToComment from "./ReplyToComment";
import { Collapse } from "reactstrap";
import { addErrorSrc } from "../../Utils/Utils";

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
    <div className="comments-section__comments-container">
      {loading ? (
        <div className="comments-section__loading">
          <Translate id="comments_section.loading" />
        </div>
      ) : comments.length < 1 ? (
        <div className="comments-section__no-comments">
          {"><((((º>"} <br /> <Translate id="comments_section.no_comments" />
        </div>
      ) : (
        <div className="comments-section__comments">
          {Object.keys(comments)
            .reverse()
            .map((key, index) => (
              <div key={index} className="comments-section__comments__single">
                <div className="comments-section__comments__single__content">
                  <Link to={`/users/${comments[key].author.username}`}>
                    <div className="comments-section__comments__single__content__img">
                      <img
                        src={
                          comments[key].author.picture
                            ? comments[key].author.picture
                            : "/Assets/no_profile_pic.png"
                        }
                        onError={addErrorSrc}
                        alt="profile of the user"
                      />{" "}
                      <div className="comments-section__comments__single__content__img-filter"></div>
                    </div>
                  </Link>
                  <div className="comments-section__comments__single__content__text">
                    <Link
                      to={`/users/${comments[key].author.username}`}
                      className="user-link link"
                    >
                      {comments[key].author.username}
                    </Link>{" "}
                    {prettyDateHours(comments[key].posted)}
                    <div>{comments[key].comment_text}</div>
                  </div>
                </div>

                <div className="comments-section__comments__single__buttons">
                  {comments[key].replies.length < 1 ? (
                    ""
                  ) : (
                    <div className="comments-section__comments__single__buttons-with-replies">
                      <div
                        className="comments-section__comments__single__show-replies-button"
                        onClick={() => {
                          showReplies(comments[key]._id);
                        }}
                      >
                        <Translate id="comments_section.show_replies" />
                        {` (${comments[key].replies.length})`}
                      </div>
                      <div>|</div>
                    </div>
                  )}

                  <div
                    className="comments-section__comments__single__reply-button"
                    onClick={() => {
                      showReplyInput(comments[key]._id);
                    }}
                  >
                    <Translate id="comments_section.reply" />
                  </div>
                </div>

                <Collapse
                  isOpen={commentIDWithActiveReplyInput === comments[key]._id}
                >
                  {loggedUser ? (
                    <ReplyToComment
                      commentID={comments[key]._id}
                      articleID={match.params.id}
                      setCommentIDWithActiveReplies={
                        setCommentIDWithActiveReplies
                      }
                    />
                  ) : (
                    <div className="comments-section__comments__single__no-auth">
                      <Translate id="comments_section.no_auth_no_reply" />
                    </div>
                  )}
                </Collapse>
                <Collapse
                  isOpen={commentIDWithActiveReplies === comments[key]._id}
                >
                  <div className="comments-section__comments__replies">
                    {comments[key].replies.map(
                      ({ author, reply_text, posted }, index) => (
                        <div
                          key={index}
                          className="comments-section__comments__replies__single"
                        >
                          <div className="comments-section__comments__replies__single__content">
                            <Link to={`/users/${author.username}`}>
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
                                to={`/users/${author.username}`}
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
