import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfile } from "../../actions/authActions";

const initialFormState = {
  name: "",
  profile_pictures: []
};

const EditProfile = ({
  auth: { isAuthenticated, loggedUser },
  editProfile
}) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    setFormData({
      name: !isAuthenticated || !loggedUser ? "" : loggedUser.name,
      profile_pictures:
        !isAuthenticated || !loggedUser ? [] : loggedUser.profile_pictures
    });
  }, [isAuthenticated, loggedUser]);

  const { name, profile_pictures } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editProfile(formData, loggedUser._id);
  };

  return !isAuthenticated ? (
    <header>
      <h1>Please login</h1>
    </header>
  ) : !loggedUser ? (
    <header>
      <h1>Loading</h1>
    </header>
  ) : (
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
          {/* <small className="form-text">
            Could be your own company or one you work for
          </small> */}
        </div>
        {profile_pictures.map(picture => (
          <img src={picture} alt="profile pictures" />
        ))}

        <input type="submit" className="btn btn-primary my-1" />
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { editProfile }
)(withRouter(EditProfile));
