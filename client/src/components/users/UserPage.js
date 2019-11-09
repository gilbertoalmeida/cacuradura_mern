import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../actions/userActions";
import PropTypes from "prop-types";

const UserPage = ({ getUser, user: { user, loading }, match }) => {
  useEffect(() => {
    getUser(match.params.id);
  }, [getUser, match.params.id]);

  //ver o que acontece quando chanma essa página com um id que nao existe
  // the loading page is kept bc article is null

  return loading || user === null ? (
    <h1>Loading</h1>
  ) : (
    <Fragment>
      <h1>
        uma <span>cacura</span>
      </h1>
      <div className="main-box-element">
        <Link to={`/users/${user._id}`} className="article-title link">
          {user.username}
        </Link>
        <br />
      </div>
    </Fragment>
  );
};

UserPage.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser }
)(UserPage);
