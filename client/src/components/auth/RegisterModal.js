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
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

import { withLocalize, Translate } from "react-localize-redux";

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    username: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props; //extracting the errors imported from the map function below that transforms the state into a prop
    if (error !== prevProps.error) {
      //equal to the previous error
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg }); //comes from the routes in the backend
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state.modal) {
      //if the modal is open
      if (this.props.isAuthenticated) {
        //if authenticated, close modal
        this.toggle();
      }
    }
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

    const { name, email, username, password } = this.state; //form data

    //Create User object
    const newUser = {
      name,
      email,
      username,
      password //not repeating the four names bc dont need it
    };

    //attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <Button className="button-form-top register" onClick={this.toggle}>
          <Translate id="authnavbar.register_button"></Translate>
        </Button>

        <Modal
          className="register-modal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader className="register-modal__header" toggle={this.toggle}>
            <Translate id="registermodal.header"></Translate>
          </ModalHeader>
          <ModalBody className="register-modal__body">
            {this.state.msg ? (
              <Translate>
                {({ translate }) => (
                  <Alert color="danger">
                    {translate(`error_messages.${this.state.msg}`)}
                  </Alert>
                )}
              </Translate>
            ) : null}
            {/* operator to show the alert only is there is an error */}
            <div
              onClick={this.toggle}
              className="register-modal__body__already_registered_msg"
            >
              <Translate id="registermodal.already_registered_msg" />
            </div>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">
                  <Translate id="registermodal.name"></Translate>
                </Label>
                <Translate>
                  {({ translate }) => (
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder={translate("registermodal.name_placeholder")}
                      className="mb-3"
                      onChange={this.onChange}
                    />
                  )}
                </Translate>

                <Label for="email">
                  <Translate id="registermodal.email"></Translate>
                </Label>
                <Translate>
                  {({ translate }) => (
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder={translate("registermodal.email_placeholder")}
                      className="mb-3"
                      onChange={this.onChange}
                    />
                  )}
                </Translate>

                <Label for="username">
                  <Translate id="registermodal.username"></Translate>
                </Label>
                <Translate>
                  {({ translate }) => (
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      maxLength="18"
                      placeholder={translate(
                        "registermodal.username_placeholder"
                      )}
                      className="mb-3"
                      onChange={this.onChange}
                    />
                  )}
                </Translate>

                <Label for="password">
                  <Translate id="registermodal.password"></Translate>
                </Label>
                <Translate>
                  {({ translate }) => (
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder={translate(
                        "registermodal.password_placeholder"
                      )}
                      className="mb-3"
                      onChange={this.onChange}
                    />
                  )}
                </Translate>

                <Button className="button-form-top submit-register" block>
                  <Translate id="registermodal.submitbutton"></Translate>
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
  error: state.error
});

export default withLocalize(
  connect(
    mapStateToProps,
    { register, clearErrors }
  )(RegisterModal)
);
