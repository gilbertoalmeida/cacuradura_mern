import React, { Component, Fragment } from "react";
import { connect } from "react-redux"; //access the state
import PropTypes from "prop-types";

import ArticleFeed from "./articles/ArticleFeed";
import RegisterModal from "./auth/RegisterModal";
import LoginForm from "./auth/LoginForm";
import Logout from "./auth/Logout";

class HomePage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <div>
          <strong>{user ? `Oi, ${user.username}` : ""}</strong>
        </div>
        <Logout />
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <RegisterModal />
        <LoginForm />
      </Fragment>
    );

    return (
      <div>
        <header className="App-header">
          <h1>
            Cacura<span>Dura</span>
          </h1>
          <p id="maindescription">
            Cacuras em formação
            <br />
            Acompanhe essa metamorfose
          </p>
        </header>
        {isAuthenticated ? authLinks : guestLinks}
        <ArticleFeed />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(HomePage);
