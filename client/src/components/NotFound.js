import React, { Fragment } from "react";
import { withLocalize, Translate } from "react-localize-redux";

const NotFound = () => {
  window.scrollTo(0, 0);
  return (
    <Fragment>
      <header className="App-header"></header>
      {/* header just here to make the space of the authnavbar */}
      <div className="not-found-main-box-element">
        <div className="not-found-title">
          <Translate id="general.not_found" />
        </div>
        <div className="not-found-body">
          <Translate id="general.not_found_text" />
        </div>
      </div>
    </Fragment>
  );
};

export default withLocalize(NotFound);
