import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { withLocalize, Translate } from "react-localize-redux";
import { addReply } from "../../actions/commentActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ReplyToComment = ({
  auth: { loggedUser },
  comment,
  error,
  addReply,
  commentID,
  articleID,
  setCommentIDWithActiveReplies
}) => {
  const [replyValue, setReplyValue] = useState("");

  useEffect(() => {
    if (comment.replying_success) {
      setReplyValue("");

      setCommentIDWithActiveReplies(commentID);
    }
  }, [comment.replying_success, setCommentIDWithActiveReplies, commentID]);

  const onSubmit = e => {
    e.preventDefault();

    const newReply = {
      author: {
        username: loggedUser.username,
        _id: loggedUser._id,
        picture: loggedUser.profile_pictures[0]
      },
      reply: replyValue
    };

    addReply(newReply, commentID, articleID);
  };

  return loggedUser ? (
    <Fragment>
      <div>
        <Form onSubmit={onSubmit} className="add-reply-form">
          <FormGroup>
            <Translate>
              {({ translate }) => (
                <Input
                  type="input"
                  name="username"
                  id="username"
                  maxLength="400"
                  autoComplete="off"
                  value={replyValue}
                  placeholder={translate("comments_section.input")}
                  onChange={e => {
                    setReplyValue(e.target.value);
                  }}
                  className="add-reply-form__input"
                />
              )}
            </Translate>
          </FormGroup>
          {error.msg.msg && comment.replying_failed ? (
            <Translate>
              {({ translate }) => (
                <Alert
                  style={{ width: "90%", margin: "10px auto" }}
                  color="add-reply-alert alert-danger"
                >
                  {translate(`error_messages.${error.msg.msg}`)}
                </Alert>
              )}
            </Translate>
          ) : null}
          {/* operator to show the alert only is there is an error */}
          <div className="add-reply-form__submit-button-container">
            {comment.replying_failed ? (
              <Button className="add-reply-form__submit-button-failed">
                <Translate id="comments_section.posting_failed" />
              </Button>
            ) : (
              <Button className="add-reply-form__submit-button">
                {comment.replying ? (
                  <Translate id="comments_section.posting" />
                ) : (
                  <Translate id="comments_section.submit_button" />
                )}
              </Button>
            )}
          </div>
        </Form>
      </div>
    </Fragment>
  ) : (
    ""
  );
};

ReplyToComment.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  addReply: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  comment: state.comment,
  error: state.error
});

export default withLocalize(
  connect(
    mapStateToProps,
    { addReply }
  )(ReplyToComment)
);
