import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props; //extracting the errors imported from the map function below that transforms the state into a prop
    if (error !== prevProps.error) {
      //equal to the previous error
      //Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg }); //comes from the routes in the backend
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state; //from the form

    const user = {
      username,
      password
    };

    this.props.login(user);
  };

  render() {
    return (
      <div>
        <Form inline onSubmit={this.onSubmit} className="form-top">
          <FormGroup>
            {/* <Label for="username">Usuário</Label> */}
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Nome de cacura"
              onChange={this.onChange}
              className="field-form-top"
            />
          </FormGroup>
          <FormGroup>
            {/* <Label for="password">Senha</Label> */}
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              onChange={this.onChange}
              className="field-form-top"
            />
          </FormGroup>
          <Button className="button-form-top login">Entrar</Button>
        </Form>
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
  { login }
)(LoginForm);
