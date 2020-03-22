import React, { Fragment, useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { withLocalize, Translate } from "react-localize-redux";

const AddComment = ({ articleID }) => {
  const [comment, setComment] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    alert("Posted");
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
          <div className="add-comment-form__submit-button-container">
            <Button className="add-comment-form__submit-button">
              <Translate id="comments_section.submit_button" />
            </Button>
          </div>
        </Form>
        <div>ID of the article to be used in the post request: {articleID}</div>
      </div>
    </Fragment>
  );
};

export default withLocalize(AddComment);
