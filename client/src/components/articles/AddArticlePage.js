import React, { Component } from "react";
import { Button, Form, FormGroup, Alert } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { addArticle } from "../../actions/articleActions";
import { clearErrors } from "../../actions/errorActions";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import ChooseCoverPicModal from "./ChooseCoverPicModal";
import { prettyDateNoHours } from "../../Utils/Utils";

import { withLocalize, Translate } from "react-localize-redux";

class AddArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      coverImgLoading: false
    };
    this.onChange = editorState => this.setState({ editorState });
  }

  state = {
    body: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
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

    window.addEventListener("resize", () => {
      let textarea = document.querySelector("textarea");
      textarea.style.height = "1em";

      // Get the computed styles for the element
      var computed = window.getComputedStyle(textarea);

      // Calculate the height
      var height =
        parseInt(computed.getPropertyValue("border-top-width"), 10) +
        parseInt(computed.getPropertyValue("padding-top"), 10) +
        textarea.scrollHeight +
        parseInt(computed.getPropertyValue("padding-bottom"), 10) +
        parseInt(computed.getPropertyValue("border-bottom-width"), 10);

      textarea.style.height = height + "px";
    });
  }

  fieldsOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /* What is happening writingPic and setLoadingToFalse is interesting. So, the first function gets the img that the person added 
  in the modal and updates the state of this component with it. However, this changes the styling of the title of the article, 
  since it is different depending on if a person adds or not a cover picture. So it happened that a title that was too big and had 
  two lines with picture, needed only one line without a pic (and viceversa). So I need to recaulculate the height of the textarea 
  element (that expands automatically). The second function is called only when the img finishes loading. The styles change when
  there is a feed_img AND it has been loaded. So I copied the autoexpand code to the callback of the second setState (since it takes 
  some milisaconds to finish). This is ugly, but I had to do it, bc I couldn't just call the function again here. I need to re-write 
  this when I transform this component into a functional one. Maybe it can work better there.
  (and now it is repeated in componentdidmount to capture window resize too hahaha I need to re-write this!!)
  
  I NEED TO USE EFFECT HOOK FOR THIS!!
  It is basically componentdidmount and componentdidupdate together. I guess this is what i need here.

  */

  writingPic = feed_img_modal => {
    this.setState({ feed_img: feed_img_modal, coverImgLoading: true });
  };

  setLoadingToFalse = () => {
    this.setState({ coverImgLoading: false }, () => {
      let textarea = document.querySelector("textarea");
      textarea.style.height = "1em";

      // Get the computed styles for the element
      var computed = window.getComputedStyle(textarea);

      // Calculate the height
      var height =
        parseInt(computed.getPropertyValue("border-top-width"), 10) +
        parseInt(computed.getPropertyValue("padding-top"), 10) +
        textarea.scrollHeight +
        parseInt(computed.getPropertyValue("padding-bottom"), 10) +
        parseInt(computed.getPropertyValue("border-bottom-width"), 10);

      textarea.style.height = height + "px";
    });
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
        username: this.props.auth.loggedUser.username || "cacura não logada",
        _id: this.props.auth.loggedUser._id || "cacura não logada"
      }
    };

    //send the article
    this.props.addArticle(newArticle);

    /* CODE MOVED. This redirect code was moved to the axios request at articleActions. To make it wait for ADD_ARTICLE_SUCCESS
    this.props.history.push(`/users/${this.props.user._id}`);
      window.location.reload(); */
  };

  addDefaultSrc(ev) {
    ev.target.src = "/Assets/img_load_fail.png";
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
    const { posting, posting_failed } = this.props.article;
    let datenow = Date.now();

    const { isAuthenticated, loggedUser } = this.props.auth;

    return !isAuthenticated ? (
      <header>
        <h1>Please login</h1>
      </header>
    ) : !loggedUser ? (
      <header>
        <h1>Loading</h1>
      </header>
    ) : (
      <div>
        <div className="post-article-main-box-element">
          <Form className="add-article-form" onSubmit={this.onSubmit}>
            <FormGroup>
              <div className="post-article-cover">
                <img
                  src={this.state.feed_img}
                  onError={this.addDefaultSrc}
                  onLoad={this.setLoadingToFalse}
                  alt=""
                  style={{
                    display:
                      this.state.feed_img && !this.state.coverImgLoading
                        ? "block"
                        : "none"
                  }}
                />
                <div
                  className="post-article-cover-img-filter"
                  style={{
                    display:
                      this.state.feed_img && !this.state.coverImgLoading
                        ? "block"
                        : "none"
                  }}
                ></div>
                <div
                  className={`post-article-cover-${
                    this.state.feed_img && !this.state.coverImgLoading
                      ? "img-text"
                      : "text"
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
                            this.state.feed_img && !this.state.coverImgLoading
                              ? "-img"
                              : "out-img"
                          }`}
                          onChange={this.fieldsOnChange}
                        />
                      )}
                    </Translate>
                    <time dateTime={datenow}>
                      <p>§}> {prettyDateNoHours(datenow)},</p>
                      <p>
                        <Translate id="article.by" />{" "}
                        <Link
                          to={`/users/${loggedUser._id}`}
                          className="user-link link"
                        >
                          {loggedUser.username}
                        </Link>{" "}
                      </p>
                    </time>
                  </div>
                </div>
                <ChooseCoverPicModal
                  feed_img={this.state.feed_img}
                  writingPic={this.writingPic}
                />
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
              {posting_failed ? (
                <Button
                  className="button-form-top submit-post-article-failed"
                  block
                >
                  <Translate id="article.posting_failed" />
                </Button>
              ) : (
                <Button className="button-form-top submit-post-article" block>
                  {posting ? (
                    <Translate id="article.posting" />
                  ) : (
                    <Translate id="article.post" />
                  )}
                </Button>
              )}
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
  auth: state.auth,
  article: state.article
});

export default withLocalize(
  connect(
    mapStateToProps,
    { addArticle, clearErrors }
  )(withRouter(AddArticlePage))
);
