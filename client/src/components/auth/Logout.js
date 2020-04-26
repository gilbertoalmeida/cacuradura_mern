import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

import { withLocalize, Translate } from "react-localize-redux";

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  logoutProcedure = () => {
    this.props.history.push("/");
    this.props.logout();
  };

  componentDidMount() {
    if (this.props.isOpen) {
      this.props.toggle();
    }
  }

  render() {
    return (
      <Fragment>
        <Button
          className="button-form-top logout"
          onClick={this.logoutProcedure}
        >
          <Translate id="authnavbar.logoutbutton" />
        </Button>
      </Fragment>
    );
  }
}

export default withLocalize(
  connect(
    null,
    { logout }
  )(withRouter(Logout))
);
