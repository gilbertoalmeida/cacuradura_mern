import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";

import { withLocalize, Translate } from "react-localize-redux";

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

  componentDidMount() {
    if (this.props.isOpen) {
      this.props.toggle();
    }
  }

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
      username: username.trim(),
      password
    };

    this.props.login(user);
  };

  render() {
    return (
      <div>
        <Form inline onSubmit={this.onSubmit} className="form-top">
          <FormGroup>
            <Translate>
              {({ translate }) => (
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder={translate("authnavbar.username_placeholder")}
                  onChange={this.onChange}
                  className="field-form-top"
                />
              )}
            </Translate>
          </FormGroup>
          <FormGroup>
            <Translate>
              {({ translate }) => (
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder={translate("authnavbar.password_placeholder")}
                  onChange={this.onChange}
                  className="field-form-top"
                />
              )}
            </Translate>
          </FormGroup>
          <Button className="button-form-top login">
            <Translate id="authnavbar.loginbutton" />
          </Button>
        </Form>
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
    { login }
  )(LoginForm)
);
