import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <Button className="button-form-top logout" onClick={this.props.logout}>
          Deslogar
        </Button>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
