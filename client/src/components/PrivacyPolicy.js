import React, { Fragment } from "react";
import { withLocalize, Translate } from "react-localize-redux";
import RegisterModal from "./auth/RegisterModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivacyPolicy = ({ auth }) => {
  window.scrollTo(0, 0);
  return (
    <Fragment>
      <header className="App-header"></header>
      {/* header just here to make the space of the authnavbar */}
      <div className="privacy-page-main-box-element">
        <div className="privacy-title">
          <Translate id="footer.privacy_policy" />
        </div>
        <div className="privacy-body">
          <Translate id="footer.privacy_policy_text" />
          {auth.loggedUser ? null : (
            <div className="privacy-body__register-call-to-action">
              <RegisterModal />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

PrivacyPolicy.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withLocalize(connect(mapStateToProps)(PrivacyPolicy));
