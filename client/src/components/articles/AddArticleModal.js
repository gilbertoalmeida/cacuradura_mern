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
import { addArticle } from "../../actions/articleActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
  state = {
    modal: false,
    text: "",
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
      //Check for register error
      if (error.id === "ADD_ARTICLE_FAIL") {
        this.setState({ msg: error.msg.msg }); //comes from the routes in the backend
      } else {
        this.setState({ msg: null });
      }
    }

    /* if (this.state.modal) {
      //if the modal is open
      if (this.props.isAuthenticated) {
        //if authenticated, close modal
        this.toggle();
      }
    } */
  }

  toggle = () => {
    this.props.clearErrors(); //calling this so that the error alert doesnt stay in the modal after you close and open
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, body } = this.state; //form data

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
  };

  render() {
    return (
      <div>
        <Button className="button-form-top post-article" onClick={this.toggle}>
          Postar um artigo
        </Button>

        <Modal
          className="post-article-modal"
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
                <Label for="title">Título</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Um titulo bem bonito"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="body">Texto</Label>
                <Input
                  type="textarea"
                  name="body"
                  id="body"
                  placeholder="Um texto bem bonito"
                  className="mb-3"
                  onChange={this.onChange}
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
)(RegisterModal);
