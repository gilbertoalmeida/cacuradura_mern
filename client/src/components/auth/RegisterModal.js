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
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    username: "",
    password: ""
  });
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

  const onChange = e => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    //Create User object
    const newUser = registerForm;

    //attempt to register
    register(newUser);
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
          {errorMsg ? (
            <Translate>
              {({ translate }) => (
                <Alert color="danger">
                  {translate(`error_messages.${errorMsg}`)}
                </Alert>
              )}
            </Translate>
          ) : null}
          {/* operator to show the alert only is there is an error */}
          <div
            onClick={toggle}
            className="register-modal__body__already_registered_msg"
          >
            <Translate id="registermodal.already_registered_msg" />
          </div>
          <Form onSubmit={onSubmit}>
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
                  />
                )}
              </Translate>

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
