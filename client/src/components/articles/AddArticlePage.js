import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { addArticle } from "../../actions/articleActions";
import { clearErrors } from "../../actions/errorActions";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import ChooseCoverPicModal from "./ChooseCoverPicModal";

import { withLocalize, Translate } from "react-localize-redux";

class AddArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }

  state = {
    body: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    addArticle: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props; //extracting the errors imported from the map function below that transforms the state into a prop
    if (error !== prevProps.error) {
      //equal to the previous error
      //Check for add article error
      if (error.id === "ADD_ARTICLE_FAIL") {
        this.setState({ msg: error.msg.msg }); //comes from the routes in the backend
      } else {
        this.setState({ msg: null });
      }
    }
  }

  fieldsOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  writingPic = feed_img_modal => {
    this.setState({ feed_img: feed_img_modal });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, feed_img } = this.state;

    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const body = stateToHTML(contentState);

    //Create Article object
    const newArticle = {
      title,
      body,
      feed_img,
      language: this.props.activeLanguage.code,
      author: {
        username: this.props.user.username || "cacura não logada",
        _id: this.props.user._id || "cacura não logada"
      }
    };

    //send the article
    this.props.addArticle(newArticle);

    if (title && body !== "<p><br></p>") {
      this.props.history.push(`/users/${this.props.user._id}`);
      window.location.reload();
    }
  };

  addDefaultSrc(ev) {
    ev.target.src = "https://pbs.twimg.com/media/Bw8Kiy4CAAAhcy6.jpg";
  }

  render() {
    /* text are autoexpand START */

    /* I NEED TO CHANGE THAT FOR ONE THAT IMMITATES THE SIZE OF A NORMAL DIV
BECAUSE I HAVE MANY PROBLEMS WHEN THE PERSON CHANGES THE SIZE WHILE USING */

    var autoExpand = function(field) {
      // Reset field height
      field.style.height = "1em";

      // Get the computed styles for the element
      var computed = window.getComputedStyle(field);

      // Calculate the height
      var height =
        parseInt(computed.getPropertyValue("border-top-width"), 10) +
        parseInt(computed.getPropertyValue("padding-top"), 10) +
        field.scrollHeight +
        parseInt(computed.getPropertyValue("padding-bottom"), 10) +
        parseInt(computed.getPropertyValue("border-bottom-width"), 10);

      field.style.height = height + "px";
    };

    document.addEventListener(
      "input",
      function(event) {
        if (event.target.tagName.toLowerCase() !== "textarea") return;
        autoExpand(event.target);
      },
      false
    );
    /* text are autoexpand END */

    const { editorState } = this.state;
    let datenow = Date.now();

    return (
      <div>
        <div className="post-article-main-box-element">
          <Form className="add-article-form" onSubmit={this.onSubmit}>
            <FormGroup>
              <div className="post-article-cover">
                <img
                  src={this.state.feed_img}
                  onError={this.addDefaultSrc}
                  alt=""
                  style={{ display: this.state.feed_img ? "block" : "none" }}
                />
                <div
                  style={{ display: this.state.feed_img ? "block" : "none" }}
                  className="post-article-cover-img-filter"
                ></div>
                <div
                  className={`post-article-cover-${
                    this.state.feed_img ? "img-text" : "text"
                  } `}
                >
                  <div className="post-article-title">
                    <Translate>
                      {({ translate }) => (
                        <textarea
                          type="text"
                          name="title"
                          id="title"
                          placeholder={translate("add_article_page.title")}
                          maxLength="60"
                          className={`title-textarea-with${
                            this.state.feed_img ? "-img" : "out-img"
                          }`}
                          onChange={this.fieldsOnChange}
                        />
                      )}
                    </Translate>
                    <time dateTime={datenow}>
                      <p>
                        §}>{" "}
                        {new Date(datenow).getDate() +
                          "/" +
                          (new Date(datenow).getMonth() + 1) +
                          "/" +
                          new Date(datenow).getFullYear()}
                        ,
                      </p>
                      <p>
                        <Translate id="article.by"></Translate>{" "}
                        {/* <Link
                          to={`/users/${this.props.user._id}`}
                          className="user-link link"
                        >
                          {this.props.user.username}
                        </Link>{" "} */}
                      </p>
                    </time>
                  </div>
                </div>
              </div>

              <Translate>
                {({ translate }) => (
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder={translate("add_article_page.body")}
                    localization={{
                      locale: translate("add_article_page.language")
                    }}
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "list",
                        "link",
                        "emoji",
                        "image",
                        "remove",
                        "history"
                      ],
                      inline: {
                        options: [
                          "bold",
                          "italic",
                          "underline",
                          "strikethrough"
                        ]
                      },
                      blockType: {
                        options: [
                          "Normal",
                          "H2",
                          "H3",
                          "H4",
                          "H5",
                          "H6",
                          "Blockquote"
                        ]
                      },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true }
                    }}
                  />
                )}
              </Translate>

              <ChooseCoverPicModal
                feed_img={this.state.feed_img}
                writingPic={this.writingPic}
              />

              {this.state.msg ? (
                <Translate>
                  {({ translate }) => (
                    <Alert color="add-article-alert alert-danger">
                      {translate(`error_messages.${this.state.msg}`)}
                    </Alert>
                  )}
                </Translate>
              ) : null}
              {/* operator to show the alert only is there is an error */}
              <Button className="button-form-top submit-post-article" block>
                Postar
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user
});

export default withLocalize(
  connect(
    mapStateToProps,
    { addArticle, clearErrors }
  )(withRouter(AddArticlePage))
);
