import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { withLocalize, Translate } from "react-localize-redux";
import { addComment } from "../../actions/commentActions";
import { clearErrors } from "../../actions/errorActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddComment = ({
  articleID,
  auth: { loggedUser },
  comment,
  error,
  addComment,
  clearErrors
}) => {
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    clearErrors();
  }, [clearErrors, loggedUser]);

  useEffect(() => {
    if (comment.posting_success) {
      setCommentValue("");
    }
  }, [comment.posting_success]);

  const onSubmit = e => {
    e.preventDefault();

    const newComment = {
      articleID,
      author: {
        username: loggedUser.username,
        _id: loggedUser._id,
        picture: loggedUser.profile_pictures[0]
      },
      comment: commentValue
    };

    addComment(newComment);
  };

  return (
    <Fragment>
      <div>
        <Form onSubmit={onSubmit} className="add-comment-form">
          <FormGroup>
            <Translate>
              {({ translate }) => (
                <Input
                  type="textarea"
                  name="username"
                  id="username"
                  maxLength="400"
                  value={commentValue}
                  placeholder={
                    loggedUser ? translate("comments_section.input") : ""
                  }
                  onChange={e => {
                    setCommentValue(e.target.value);
                  }}
                  className="add-comment-form__textarea"
                  disabled={!loggedUser}
                />
              )}
            </Translate>
            {loggedUser ? (
              ""
            ) : (
              <div className="add-comment-form__textarea-no-auth-filter">
                <div className="add-comment-form__textarea-no-auth-filter__verticle-center">
                  <Translate id="comments_section.no_auth_no_comment" />
                </div>
              </div>
            )}
          </FormGroup>
          {error.msg.msg && comment.posting_failed ? (
            <Translate>
              {({ translate }) => (
                <Alert
                  style={{ width: "90%", margin: "10px auto" }}
                  color="add-article-alert alert-danger"
                >
                  {translate(`error_messages.${error.msg.msg}`)}
                </Alert>
              )}
            </Translate>
          ) : null}
          {/* operator to show the alert only is there is an error */}
          <div className="add-comment-form__submit-button-container">
            {comment.posting_failed ? (
              <Button className="add-comment-form__submit-button-failed">
                <Translate id="comments_section.posting_failed" />
              </Button>
            ) : (
              <Button
                className="add-comment-form__submit-button"
                disabled={!loggedUser}
              >
                {comment.posting ? (
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
  );
};

AddComment.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  comment: state.comment,
  error: state.error
});

export default withLocalize(
  connect(
    mapStateToProps,
    { addComment, clearErrors }
  )(AddComment)
);
