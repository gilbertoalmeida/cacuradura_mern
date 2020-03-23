import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { withLocalize, Translate } from "react-localize-redux";
import { addComment } from "../../actions/articleActions";
import { clearErrors } from "../../actions/errorActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddComment = ({
  articleID,
  auth: { loggedUser },
  article: { posting_comment },
  error,
  addComment,
  clearErrors
}) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const onSubmit = e => {
    e.preventDefault();

    const newComment = {
      articleID,
      author: {
        username: loggedUser.username,
        _id: loggedUser._id
      },
      comment
    };

    addComment(newComment);
  };

  return loggedUser ? (
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
                  value={comment}
                  placeholder={translate("comments_section.input")}
                  onChange={e => {
                    setComment(e.target.value);
                  }}
                  className="add-comment-form__textarea"
                />
              )}
            </Translate>
          </FormGroup>
          {error.msg.msg ? (
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
            <Button className="add-comment-form__submit-button">
              {posting_comment ? (
                <Translate id="comments_section.posting" />
              ) : (
                <Translate id="comments_section.submit_button" />
              )}
            </Button>
          </div>
        </Form>
      </div>
    </Fragment>
  ) : (
    ""
  );
};

AddComment.propTypes = {
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  article: state.article,
  error: state.error
});

export default withLocalize(
  connect(
    mapStateToProps,
    { addComment, clearErrors }
  )(AddComment)
);
