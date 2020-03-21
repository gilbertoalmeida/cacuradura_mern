import React, { Fragment } from "react";
import { withLocalize, Translate } from "react-localize-redux";

const About = () => {
  return (
    <Fragment>
      <header className="App-header"></header>
      {/* header just here to make the space of the authnavbar */}
      <div className="about-page-main-box-element">
        <div className="about-title">
          <Translate id="footer.about" />
        </div>
        <div className="about-body">
          <Translate id="footer.about_text" />
        </div>
      </div>
    </Fragment>
  );
};

export default withLocalize(About);
