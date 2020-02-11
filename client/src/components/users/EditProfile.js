import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfile } from "../../actions/authActions";

const initialFormState = {
  name: "",
  new_profile_pic: ""
};

const EditProfile = ({
  auth: { isAuthenticated, loggedUser },
  editProfile
}) => {
  const [formData, setFormData] = useState({ initialFormState });
  const [profilePicsArray, setProfilePicsArray] = useState([]);

  useEffect(() => {
    setFormData({
      name: !isAuthenticated || !loggedUser ? "" : loggedUser.name,
      new_profile_pic: ""
    });
    setProfilePicsArray(
      !isAuthenticated || !loggedUser ? [] : loggedUser.profile_pictures
    );
    console.log("effect");
  }, [isAuthenticated, loggedUser]);

  const { name } = formData;

  const addDefaultSrc = ev => {
    ev.target.src = "/Assets/img_load_fail.png";
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addPicToArray = e => {
    e.preventDefault();

    let newpic = formData.new_profile_pic;

    setProfilePicsArray(profilePicsArray => [...profilePicsArray, newpic]);
  };

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
    <div className="edit-profile-main-box-element">
      <h1 className="">Edit Your Profile</h1>
      <p className="">
        <i className="" /> Add some changes to your profile
      </p>
      {/* <small>* = required field</small> */}
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        {profilePicsArray.map(picture => (
          <img
            className="profile-pics-thumbnail"
            src={picture}
            onError={addDefaultSrc}
            alt="profile pictures"
          />
        ))}
        <div className="form-group">
          <input
            type="text"
            placeholder="Add a profile pic"
            name="new_profile_pic"
            onChange={e => onChange(e)}
          />
        </div>
        <button onClick={addPicToArray}>Add the pic</button>

        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/">Homepage</Link>
      </form>
    </div>
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
