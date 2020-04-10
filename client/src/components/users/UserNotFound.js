import React, { Fragment } from "react";
import { withLocalize, Translate } from "react-localize-redux";
import { Link } from "react-router-dom";

const UserNotFound = () => {
  window.scrollTo(0, 0);
  return (
    <Fragment>
      <header className="App-header"></header>
      {/* header just here to make the space of the authnavbar */}
      <div className="user-not-found-main-box-element">
        <div className="user-not-found-title">
          <Translate id="user_page.user_not_found" />
        </div>
        <div className="user-not-found-body">
          <Translate id="user_page.user_not_found_text" />
          <p style={{ marginTop: "40px", width: "100%", textAlign: "center" }}>
            <Link to="/" className="general-pink-link">
              <Translate id="general.back_to_homepage" />
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default withLocalize(UserNotFound);
