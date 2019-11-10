import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Alert
} from "reactstrap";
import { connect } from "react-redux"; //access the state
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import RegisterModal from "./auth/RegisterModal";
import LoginForm from "./auth/LoginForm";
import Logout from "./auth/Logout";

class AuthNavBar extends Component {
  state = {
    isOpen: false,
    msg: null
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props; //extracting the errors imported from the map function below that transforms the state into a prop
    if (error !== prevProps.error) {
      //equal to the previous error
      //Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg }); //comes from the routes in the backend
        this.timer = setTimeout(() => this.setState({ msg: null }), 4000);
      } else {
        this.setState({ msg: null });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <Nav className="ml-auto" navbar>
          <NavItem className="greeting-outside-collapse">
            {/* Using two greetings bc I can't make the greeting be outside of the collape, but still be next to the buttons. So I am using two types and hidding each of them depending if the collapse happened or not */}
            <span>
              <strong>
                {user ? (
                  <div>
                    Oi,{" "}
                    <Link to={`/users/${user._id}`} className="user-link link">
                      {user.username}
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </strong>
            </span>
          </NavItem>
        </Nav>
        <NavbarToggler onClick={this.toggle}></NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="greeting-inside-collapse">
              <span>
                <strong>
                  {user ? (
                    <div>
                      Oi,{" "}
                      <Link
                        to={`/users/${user._id}`}
                        className="user-link link"
                      >
                        {user.username}
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </strong>
              </span>
            </NavItem>
            <NavItem>
              <Logout />
            </NavItem>
          </Nav>
        </Collapse>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavbarToggler onClick={this.toggle}></NavbarToggler>
        <Collapse isOpen={this.state.isOpen} className="ml-auto" navbar>
          <Nav className="ml-auto justify-content-end" navbar>
            <NavItem>
              <LoginForm />
            </NavItem>
            <NavItem>
              <RegisterModal />
            </NavItem>
          </Nav>
        </Collapse>
      </Fragment>
    );

    return (
      <div>
        <Navbar
          fixed="top"
          style={{ backgroundColor: "#f02d0a70" }}
          expand="md"
          className="main-box-element navbar-dark"
        >
          <Container>
            <NavbarBrand href="/">
              <img
                alt="favicon of the website"
                src="/NavBarBrand.png"
                width="32"
                height="32"
                className="d-inline-block align-top"
              />
            </NavbarBrand>
            {isAuthenticated ? authLinks : guestLinks}
          </Container>
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}{" "}
          {/* operator to show the alert only is there is an error */}
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  null
)(AuthNavBar);
