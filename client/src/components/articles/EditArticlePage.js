import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Alert } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getArticle } from "../../actions/articleActions";
import { clearErrors } from "../../actions/errorActions";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
/* import { stateToHTML } from "draft-js-export-html"; */
import { stateFromHTML } from "draft-js-import-html";
import ChooseCoverImgModal from "./ChooseCoverImgModal";
import { prettyDateNoHours, useWindowDimensions } from "../../Utils/Utils";
import {
  withLocalize,
  Translate,
  getActiveLanguage
} from "react-localize-redux";
import { resizeTitleTextarea } from "../../Utils/Utils";
import PleaseLogin from "../PleaseLogin";

let resizeEventListener = null;

const EditArticlePage = ({
  error,
  chosenLanguage,
  auth: { loggedUser, isAuthenticated },
  article: { article, posting, posting_failed },
  getArticle,
  clearErrors,
  match
}) => {
  const [editorState, setEditorState] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [coverImgLoading, setCoverImgLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getArticle(match.params.id);
    window.scrollTo(0, 0);
  }, [getArticle, match.params.id]);

  useEffect(() => {
    if (article) {
      let contentState = stateFromHTML(article.body);
      setEditorState(EditorState.createWithContent(contentState));
      setArticleTitle(article.title);
      setCoverImg(article.coverImg);
    }
  }, [article]);

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

  if (resizeEventListener === null) {
    /* If I don't check for this, it adds a new event listener on every render, and it becomes an 
    exponential problem.*/
    resizeEventListener = window.addEventListener("resize", () => {
      let textarea = document.querySelector("textarea");
      resizeTitleTextarea(textarea);
    });
  }

  useEffect(() => {
    let textareaTitulo = document.querySelector("textarea");
    resizeTitleTextarea(textareaTitulo);
  }, [articleTitle, coverImgLoading]);

  const coverImgInState = coverImgModal => {
    setCoverImg(coverImgModal);
    setCoverImgLoading(true);
  };

  const setLoadingToFalse = () => {
    setCoverImgLoading(false);
  };

  const onSubmit = e => {
    e.preventDefault();

    /* const contentState = editorState.getCurrentContent();
    const body = stateToHTML(contentState); */

    //Create Article object
    /* const newArticle = {
      title: articleTitle,
      body,
      coverImg,
      language: chosenLanguage,
      author: {
        username: loggedUser.username || "cacura não logada",
        _id: loggedUser._id || "cacura não logada"
      }
    }; */

    //send the article

    /* CODE MOVED. This redirect code was moved to the axios request at articleActions. To make it wait for ADD_ARTICLE_SUCCESS
    this.props.history.push(`/users/${this.props.user._id}`);
      window.location.reload(); */
  };

  const addDefaultSrc = ev => {
    ev.target.src = "/Assets/img_load_fail.png";
  };

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

  const dateNow = Date.now();
  const { width } = useWindowDimensions();

  return !isAuthenticated ? (
    <PleaseLogin />
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
                        value={articleTitle}
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
                        to={`/users/${loggedUser.username}`}
                        className="user-link link"
                      >
                        {loggedUser.username}
                      </Link>{" "}
                    </p>
                  </time>
                </div>
              </div>
              <ChooseCoverImgModal
                coverImgInState={coverImgInState}
                coverImg={coverImg}
              />
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
                      inDropdown: width < 340 ? true : false,
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

            <div className="post-article-button-alert-wrapper">
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
                <Button
                  className={`button-form-top submit-post-article ${
                    errorMsg ? "posting-failed" : ""
                  }`}
                  block
                >
                  {posting ? (
                    <Translate id="article.posting" />
                  ) : (
                    <Translate id="article.post" />
                  )}
                </Button>
              )}
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

EditArticlePage.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired,
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
    { getArticle, clearErrors }
  )(withRouter(EditArticlePage))
);
