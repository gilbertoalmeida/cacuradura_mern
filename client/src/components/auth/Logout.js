import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  logoutProcedure = () => {
    this.props.history.push("/");
    this.props.logout();
  };

  render() {
    return (
      <Fragment>
        <Button
          className="button-form-top logout"
          onClick={this.logoutProcedure}
        >
          Deslogar
        </Button>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(withRouter(Logout));
