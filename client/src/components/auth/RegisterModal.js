import React, { useState, useEffect, useCallback } from "react";
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
import { Link } from "react-router-dom";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

import { withLocalize, Translate } from "react-localize-redux";

const RegisterModal = ({ error, isAuthenticated, clearErrors, register }) => {
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameMsg, setUsernameMsg] = useState(null);
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  /* putting the toggle function inside this callback hook was a recomendation of react
  Apparently to prevent that the toggle is created on every render */
  const toggle = useCallback(() => {
    clearErrors(); //calling this so that the error alert doesnt stay in the modal after you close and open
    setModal(!modal);
  }, [clearErrors, modal]);

  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      setErrorMsg(error.msg.msg); //comes from the routes in the backend
    } else {
      setErrorMsg(null);
    }
  }, [error]);

  useEffect(() => {
    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }, [modal, isAuthenticated, toggle]);

  const onChangeUsername = e => {
    let editedUsername = e.target.value
      .replace(/[^a-zA-Z0-9_.]/gi, "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");

    if (editedUsername !== e.target.value) {
      setUsernameMsg("username-wrong-msg");
    } else {
      setUsernameMsg(null);
    }

    setUsername(editedUsername);
  };

  useEffect(() => {
    if (username.length === 30) {
      setUsernameMsg("username-max-msg");
    } else {
      setUsernameMsg(null);
    }
  }, [username]);

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (password.length === 50) {
      setPasswordMsg("password-max-msg");
    } else {
      setPasswordMsg(null);
    }
  }, [password]);

  const onSubmit = e => {
    e.preventDefault();

    if (!username && password.length < 8) {
      setUsernameMsg("username-empty-msg");
      setPasswordMsg("password-min-msg");
    } else if (!username) {
      setUsernameMsg("username-empty-msg");
    } else if (password.length < 8) {
      setPasswordMsg("password-min-msg");
    } else {
      //Create User object
      const newUser = {
        username,
        password
      };

      //attempt to register
      register(newUser);
    }
  };

  return (
    <div>
      <Button className="button-form-top register" onClick={toggle}>
        <Translate id="authnavbar.register_button"></Translate>
      </Button>

      <Modal className="register-modal" isOpen={modal} toggle={toggle}>
        <ModalHeader className="register-modal__header" toggle={toggle}>
          <Translate id="registermodal.header"></Translate>
        </ModalHeader>
        <ModalBody className="register-modal__body">
          <div
            onClick={toggle}
            className="register-modal__body__already_registered_msg"
          >
            <Translate id="registermodal.already_registered_msg" />
          </div>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label className="mt-2" for="username">
                <Translate id="registermodal.username"></Translate>
              </Label>
              <Translate>
                {({ translate }) => (
                  <Input
                    style={{ borderColor: usernameMsg ? "#f02d0a" : "#05050a" }}
                    type="text"
                    name="username"
                    value={username}
                    maxLength="30"
                    placeholder={translate(
                      "registermodal.username_placeholder"
                    )}
                    onChange={onChangeUsername}
                  />
                )}
              </Translate>
              {usernameMsg ? (
                <div className="input-msg">
                  <Translate id={`registermodal.${usernameMsg}`} />
                </div>
              ) : null}

              <Label className="mt-4" for="password">
                <Translate id="registermodal.password"></Translate>
              </Label>
              <Translate>
                {({ translate }) => (
                  <Input
                    style={{ borderColor: passwordMsg ? "#f02d0a" : "#05050a" }}
                    type="password"
                    name="password"
                    placeholder={translate(
                      "registermodal.password_placeholder"
                    )}
                    maxLength="50"
                    onChange={onChangePassword}
                  />
                )}
              </Translate>
              {passwordMsg ? (
                <div className="input-msg">
                  <Translate id={`registermodal.${passwordMsg}`} />
                </div>
              ) : null}

              {errorMsg ? (
                <Translate>
                  {({ translate }) => (
                    <Alert className="mt-4" color="danger">
                      {translate(`error_messages.${errorMsg}`)}
                    </Alert>
                  )}
                </Translate>
              ) : null}
              <Button className="button-form-top submit-register" block>
                <Translate id="registermodal.submitbutton"></Translate>
              </Button>
            </FormGroup>
          </Form>
          <div
            onClick={toggle}
            className="register-modal__body__privicy_policy"
          >
            <Link to="/privacy_policy">
              <Translate id="general.privacy_policy" />
            </Link>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

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
