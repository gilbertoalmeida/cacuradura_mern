import React, { Component } from "react";
import { Alert, Button } from "reactstrap";
import { connect } from "react-redux";
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

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

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
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }

    if (this.state.isOpen) {
      this.toggle();
    }
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  addDefaultSrc = ev => {
    ev.target.src = "/Assets/img_load_fail.png";
  };

  render() {
    const { isAuthenticated, loggedUser } = this.props.auth;

    const authLinks = loggedUser ? (
      <div className="authnavbar__logged-content">
        <Link to={`/articles/add-article`}>
          <Button className="button-form-top post-article">
            <Translate id="authnavbar.postarticlebutton" />
          </Button>
        </Link>
        <div
          onClick={this.toggle}
          className="authnavbar__profile-pic-container"
        >
          <img
            className="authnavbar__profile-pic"
            src={
              loggedUser.profile_pictures.length === 0
                ? "/Assets/no_profile_pic.png"
                : loggedUser.profile_pictures[0]
            }
            onError={this.addDefaultSrc}
            alt="profile pic"
          />
          <div className="authnavbar__profile-pic-filter"></div>
        </div>
        <div
          className={`authnavbar__profile-menu ${
            this.state.isOpen ? "profile-menu-active" : ""
          }`}
        >
          <div className="authnavbar__profile-menu-content">
            <Link to={`/users/${loggedUser.username}`}>
              <Button onClick={this.toggle} className="button-form-top">
                View profile
              </Button>
            </Link>
            <Link to={`/users/edit-profile`}>
              <Button onClick={this.toggle} className="button-form-top">
                Edit profile
              </Button>
            </Link>
            <Logout toggle={this.toggle} isOpen={this.state.isOpen} />
          </div>
        </div>
      </div>
    ) : null;

    const guestLinks = (
      <div>
        <div
          className={`authnavbar__login-register-wrapper ${
            this.state.isOpen ? "authnavbar__hamb-content-active" : ""
          }`}
        >
          <div className="authnavbar__login-register-wrapper-content">
            <LoginForm toggle={this.toggle} isOpen={this.state.isOpen} />
            <RegisterModal />
          </div>
          <div className="authnavbar__alerts">
            {this.state.msg ? (
              <Translate>
                {({ translate }) => (
                  <Alert color="danger">
                    {translate(`error_messages.${this.state.msg}`)}
                  </Alert>
                )}
              </Translate>
            ) : null}{" "}
          </div>
        </div>
        <div
          onClick={this.toggle}
          className={`authnavbar__hamburger-menu ${
            this.state.isOpen ? "toggled" : ""
          }`}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    );

    return (
      <nav ref={node => (this.node = node)} className="authnavbar-top-fixer">
        <div className="authnavbar-main-box-element">
          <div className="authnavbar__main-content">
            <div className="authnavbar__favi-brand-wrapper">
              <Link to="/">
                <img
                  alt="favicon of the website"
                  src="/NavBarBrand.png"
                  width="32"
                  height="32"
                  className="d-inline-block align-top"
                />
              </Link>
              <LanguageToggle />
            </div>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
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
