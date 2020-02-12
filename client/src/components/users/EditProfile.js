import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Label } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfile } from "../../actions/authActions";

import { withLocalize, Translate } from "react-localize-redux";

const initialFormState = {
  name: "",
  new_profile_pic: "",
  profile_pictures: []
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
      new_profile_pic: "",
      profile_pictures: []
    });
    setProfilePicsArray(
      !isAuthenticated || !loggedUser ? [] : loggedUser.profile_pictures
    );
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

  const deletePicOfArray = picture => {
    setProfilePicsArray(profilePicsArray.filter(e => e !== picture));
  };

  const onSubmit = e => {
    e.preventDefault();
    editProfile(formData, profilePicsArray, loggedUser._id);
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
      <div className="edit-profile-header">
        <h5 className="edit-profile-title">
          <Translate id="edit_profile.title" />
        </h5>
        <Link to={`/users/${loggedUser._id}`}>
          <div className="edit-profile-cancel">X</div>
        </Link>
      </div>
      <div className="edit-profile-body">
        <form className="edit-profile-form" onSubmit={e => onSubmit(e)}>
          <Label for="name">
            <Translate id="edit_profile.name" />
          </Label>
          <input
            className="edit-profile-form-input"
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
          <Label for="profile_pictures">
            <Translate id="edit_profile.profile_pictures" />
          </Label>

          <div className="edit-profile-pictures-container">
            {profilePicsArray.map(picture => (
              <div key={picture} className="profile-pics-thumbnail-container">
                <img
                  className="profile-pics-thumbnail"
                  src={picture}
                  onError={addDefaultSrc}
                  alt="profile pictures"
                />
                <div
                  className="profile-pics-thumbnail-delete"
                  onClick={e => deletePicOfArray(picture)}
                >
                  X
                </div>
              </div>
            ))}
          </div>

          <div className="edit-profile-add-pictures">
            <input
              type="text"
              placeholder="Add the link to a profile pic"
              name="new_profile_pic"
              onChange={e => onChange(e)}
            />
            <button onClick={addPicToArray}>Add</button>
          </div>

          <Translate>
            {({ translate }) => (
              <input
                type="submit"
                className="edit-profile-button-submit"
                value={translate("edit_profile.submit")}
              />
            )}
          </Translate>

          <Link to="/">Homepage</Link>
        </form>
      </div>
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

export default withLocalize(
  connect(
    mapStateToProps,
    { editProfile }
  )(withRouter(EditProfile))
);
