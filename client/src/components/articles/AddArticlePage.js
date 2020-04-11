import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Alert } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { addArticle } from "../../actions/articleActions";
import { clearErrors } from "../../actions/errorActions";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import ChooseCoverImgModal from "./ChooseCoverImgModal";
import { prettyDateNoHours } from "../../Utils/Utils";
import {
  withLocalize,
  Translate,
  getActiveLanguage
} from "react-localize-redux";

const AddArticlePage = ({
  error,
  chosenLanguage,
  auth: { loggedUser, isAuthenticated },
  article: { posting, posting_failed },
  addArticle,
  clearErrors
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [articleTitle, setArticleTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [coverImgLoading, setCoverImgLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  useEffect(() => {
    if (error.id === "ADD_ARTICLE_FAIL") {
      setErrorMsg(error.msg.msg); //comes from the routes in the backend
    } else {
      setErrorMsg(null);
    }
  }, [error]);

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

  /* What is happening coverImgInState and setLoadingToFalse is interesting. So, the first function gets the img that the person added 
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

  const coverImgInState = coverImgModal => {
    setCoverImg(coverImgModal);
    setCoverImgLoading(true);
  };

  const setLoadingToFalse = () => {
    setCoverImgLoading(false);
  };

  useEffect(() => {
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
  }, [coverImgLoading]);

  const onSubmit = e => {
    e.preventDefault();

    const contentState = editorState.getCurrentContent();
    const body = stateToHTML(contentState);

    //Create Article object
    const newArticle = {
      title: articleTitle,
      body,
      coverImg,
      language: chosenLanguage,
      author: {
        username: loggedUser.username || "cacura não logada",
        _id: loggedUser._id || "cacura não logada"
      }
    };

    //send the article
    addArticle(newArticle);

    /* CODE MOVED. This redirect code was moved to the axios request at articleActions. To make it wait for ADD_ARTICLE_SUCCESS
    this.props.history.push(`/users/${this.props.user._id}`);
      window.location.reload(); */
  };

  const addDefaultSrc = ev => {
    ev.target.src = "/Assets/img_load_fail.png";
  };

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

  const dateNow = Date.now();

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  const maxNumberOfCharacters = 18000;
  /* Medium recomends 6 minutes articles. At a 275 words/minute rate.
  This adds to 1650.
  I want to allow until double the recomendations = 3300 words
  English avarages in 4.79 letters per word. I will use 5,5 due to the spaces
  This totals my kinda slightly objective limit of 18000 characteres*/

  const handleBeforeInput = val => {
    /* limits number of characters when typing */
    const textLength = editorState.getCurrentContent().getPlainText().length;
    if (val && textLength >= maxNumberOfCharacters) {
      setErrorMsg("max_characters");
      return "handled";
    }
    return "not-handled";
  };

  const handlePastedText = val => {
    /* limits number of characters when pasting */
    const textLength = editorState.getCurrentContent().getPlainText().length;
    if (val.length + textLength >= maxNumberOfCharacters) {
      setErrorMsg("max_characters_posted");
      return true;
    } else {
      return false;
    }
  };

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
        <Form className="add-article-form" onSubmit={onSubmit}>
          <FormGroup>
            <div className="post-article-cover">
              <img
                src={coverImg}
                onError={addDefaultSrc}
                onLoad={setLoadingToFalse}
                alt=""
                style={{
                  display: coverImg && !coverImgLoading ? "block" : "none"
                }}
              />
              <div
                className="post-article-cover-img-filter"
                style={{
                  display: coverImg && !coverImgLoading ? "block" : "none"
                }}
              ></div>
              <div
                className={`post-article-cover-${
                  coverImg && !coverImgLoading ? "img-text" : "text"
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
                        onChange={e => {
                          setArticleTitle(e.target.value);
                        }}
                        maxLength="60"
                        className={`title-textarea-with${
                          coverImg && !coverImgLoading ? "-img" : "out-img"
                        }`}
                      />
                    )}
                  </Translate>
                  <time dateTime={dateNow}>
                    <p>§}> {prettyDateNoHours(dateNow)},</p>
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
              <ChooseCoverImgModal coverImgInState={coverImgInState} />
            </div>

            <Translate>
              {({ translate }) => (
                <Editor
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  handleBeforeInput={handleBeforeInput}
                  handlePastedText={handlePastedText}
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
                      options: ["bold", "italic", "underline", "strikethrough"]
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

            {errorMsg ? (
              <Translate>
                {({ translate }) => (
                  <Alert color="add-article-alert alert-danger">
                    {translate(`error_messages.${errorMsg}`)}
                  </Alert>
                )}
              </Translate>
            ) : null}
            {/* operator to show the alert only is there is an error */}
            {errorMsg && posting_failed ? (
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
};

AddArticlePage.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  addArticle: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth,
  article: state.article,
  chosenLanguage: getActiveLanguage(state.localize).code
});

export default withLocalize(
  connect(
    mapStateToProps,
    { addArticle, clearErrors }
  )(withRouter(AddArticlePage))
);
