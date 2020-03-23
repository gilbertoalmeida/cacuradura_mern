import React, { Fragment } from "react";
import { withLocalize, Translate } from "react-localize-redux";

const Comments = () => {
  return (
    <Fragment>
      <div className="comments-section">
        <h1>Comments</h1>
        <div>Comment 1</div>
        <div>Comment 2</div>
      </div>
    </Fragment>
  );
};

export default withLocalize(Comments);
