import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { addArticle } from "../../actions/articleActions";
import { clearErrors } from "../../actions/errorActions";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }

  state = {
    modal: false,
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

  toggle = () => {
    this.props.clearErrors(); //calling this so that the error alert doesnt stay in the modal after you close and open
    this.setState({
      modal: !this.state.modal
    });
  };

  titleonChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { title } = this.state; //form data

    /* const title = "html do draft"; */

    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const body = stateToHTML(contentState);

    //Create Article object
    const newArticle = {
      title,
      body,
      author: {
        username: this.props.user.username || "cacura não logada",
        _id: this.props.user._id || "cacura não logada"
      }
    };

    //send the article
    this.props.addArticle(newArticle);

    if (title && body) {
      this.toggle();
      this.props.history.push(`/users/${this.props.user._id}`);
      window.location.reload();
    }
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Button className="button-form-top post-article" onClick={this.toggle}>
          Postar um artigo
        </Button>

        <Modal
          className="post-article-modal modal-xl"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            Conta pra nós como é ser cacura pra você
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert className="alert-danger">{this.state.msg}</Alert>
            ) : null}
            {/* operator to show the alert only is there is an error */}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="author">Autor: {this.props.user.username}</Label>
                <br />
                <Label for="title">Título</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Um titulo bem bonito"
                  className="mb-3"
                  onChange={this.titleonChange}
                />

                <Label for="body">Texto</Label>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={this.onEditorStateChange}
                  localization={{
                    locale: "pt"
                  }}
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "list",
                      "textAlign",
                      "link",
                      "embedded",
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
                <Button className="button-form-top submit-post-article" block>
                  Postar
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { addArticle, clearErrors }
)(withRouter(RegisterModal));
