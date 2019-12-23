import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Alert,
  Button
} from "reactstrap";
import { connect } from "react-redux"; //access the state
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import RegisterModal from "./auth/RegisterModal";
import LoginForm from "./auth/LoginForm";
import Logout from "./auth/Logout";
import LanguageToggle from "./LanguageToggle";

import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import overallTranslations from "../translations/all_languages.json";

class AuthNavBar extends Component {
  constructor(props) {
    super(props);

    const browserLanguage =
      window.navigator.userLanguage || window.navigator.language;

    let firstVisitLanguage = "";

    if (
      browserLanguage === "pt" ||
      browserLanguage === "pt-BR" ||
      browserLanguage === "pt-PT"
    ) {
      firstVisitLanguage = "pt";
    } else {
      firstVisitLanguage = "en";
    }

    const openingLanguage =
      window.localStorage.getItem("languageCode") || firstVisitLanguage;

    this.props.initialize({
      languages: [
        { name: "English", code: "en", icon: "uk_flag.png" },
        { name: "Português", code: "pt", icon: "brazil_flag.png" }
      ],
      translation: overallTranslations,
      options: {
        renderToStaticMarkup,
        renderInnerHtml: true,
        defaultLanguage: openingLanguage
      }
    });
  }

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

    const prevLangCode =
      prevProps.activeLanguage && prevProps.activeLanguage.code;
    const curLangCode =
      this.props.activeLanguage && this.props.activeLanguage.code;

    const hasLanguageChanged = prevLangCode !== curLangCode;

    if (hasLanguageChanged) {
      window.localStorage.setItem("languageCode", curLangCode);
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
                  <div className="authnavbar-greeting-username">
                    <Translate id="authnavbar.greeting" />{" "}
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
                    <div className="authnavbar-greeting-username">
                      <Translate id="authnavbar.greeting" />{" "}
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
              <Link to={`/articles/addarticle`}>
                <Button
                  onClick={this.toggle}
                  className="button-form-top post-article"
                >
                  <Translate id="authnavbar.postarticlebutton" />
                </Button>
              </Link>
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
          style={{ backgroundColor: "#f02d0a70", flexFlow: "wrap" }}
          expand="md"
          className="authnavbar-main-box-element navbar-dark"
        >
          <div className="navbar-wrapper">
            <div className="navbar-wrapper-brand-lang">
              <NavbarBrand href="/">
                <img
                  alt="favicon of the website"
                  src="/NavBarBrand.png"
                  width="32"
                  height="32"
                  className="d-inline-block align-top"
                />
              </NavbarBrand>
              <LanguageToggle />
            </div>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
          <Container style={{ display: "block" }}>
            {this.state.msg ? (
              <Translate>
                {({ translate }) => (
                  <Alert color="danger">
                    {translate(`error_messages.${this.state.msg}`)}
                  </Alert>
                )}
              </Translate>
            ) : null}{" "}
            {/* operator to show the alert only if there is an error */}
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default withLocalize(
  connect(
    mapStateToProps,
    null
  )(AuthNavBar)
);
