import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authActions";

const EditProfile = ({
  auth: { isAuthenticated, isLoading, user },
  loadUser
}) => {
  const [formData, setFormData] = useState({
    name: ""
  });

  useEffect(() => {
    /* Calling this here was making the action be called non-stop. I wanted to make sure that
    there is a user inside auth, but maybe this is not necessary */
    /* loadUser(); */

    setFormData({
      name: isLoading || !user.name ? "" : user.name
    });
  }, [isLoading, loadUser]);

  const { name } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    /* createProfile(formData, history, true); */
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  loadUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadUser }
)(withRouter(EditProfile));
