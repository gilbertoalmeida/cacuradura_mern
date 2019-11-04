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
        <Button className="button-form-top registrar" onClick={this.toggle}>
          Registre-se
        </Button>

        <Modal
          className="register-modal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            Conta pra nós quem você é:
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert className="alert-danger">{this.state.msg}</Alert>
            ) : null}
            {/* operator to show the alert only is there is an error */}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Nome</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Seu nome real oficial social"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Não mandaremos nada que você não peça"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="username">Nome de cacura</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Um irreal, não oficial, pra usar por aqui"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="password">Senha</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Não erre, porque aqui não tem confirmar"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button className="button-form-top submit-register" block>
                  Pronto
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

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
