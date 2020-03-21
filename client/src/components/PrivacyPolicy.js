import React, { Fragment } from "react";
import { withLocalize, Translate } from "react-localize-redux";

const PrivacyPolicy = () => {
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
        </div>
      </div>
    </Fragment>
  );
};

export default withLocalize(PrivacyPolicy);
