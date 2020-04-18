import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Label } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfile } from "../../actions/authActions";
import PleaseLogin from "../PleaseLogin";
import { withLocalize, Translate } from "react-localize-redux";
import { Alert } from "reactstrap";
import { clearErrors } from "../../actions/errorActions";

const initialFormState = {
  username: "",
  new_profile_pic: ""
};

const EditProfile = ({
  auth: { isAuthenticated, loggedUser, token },
  error,
  editProfile,
  clearErrors
}) => {
  const [formData, setFormData] = useState({ initialFormState });
  const [profilePicsArray, setProfilePicsArray] = useState([]);
  const [addPicDisabled, setAddPicDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const { username, new_profile_pic } = formData;

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  useEffect(() => {
    if (error.id === "EDIT_PROFILE_FAIL") {
      setErrorMsg(error.msg.msg); //comes from the routes in the backend
    } else {
      setErrorMsg(null);
    }
  }, [error]);

  useEffect(() => {
    /* avoiding problems with getting to this page without being logged in */
    setFormData({
      username: !isAuthenticated || !loggedUser ? "" : loggedUser.username,
      new_profile_pic: ""
    });
    setProfilePicsArray(
      !isAuthenticated || !loggedUser ? [] : loggedUser.profile_pictures
    );
  }, [isAuthenticated, loggedUser]);

  useEffect(() => {
    if (profilePicsArray.length >= 9 || new_profile_pic === "") {
      setAddPicDisabled(true);
    } else {
      setAddPicDisabled(false);
    }
  }, [profilePicsArray, new_profile_pic]);

  const addDefaultSrc = ev => {
    ev.target.src = "/Assets/img_load_fail.png";
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addPicToArray = e => {
    e.preventDefault();

    setProfilePicsArray(profilePicsArray => [
      ...profilePicsArray,
      new_profile_pic
    ]);
    setFormData({ ...formData, new_profile_pic: "" });
  };

  const deletePicOfArray = index => {
    let toBeRemoved = profilePicsArray.splice(index, 1);
    setProfilePicsArray(profilePicsArray.filter(e => e !== toBeRemoved));
  };

  const onSubmit = e => {
    e.preventDefault();
    editProfile(formData, profilePicsArray, loggedUser._id);
  };

  return !isAuthenticated && !token ? (
    <PleaseLogin />
  ) : (
    <div className="edit-profile-main-box-element">
      <div className="edit-profile-header">
        <h5 className="edit-profile-title">
          <Translate id="edit_profile.title" />
        </h5>
        <Link to={`/${isAuthenticated ? "users/" + loggedUser._id : ""}`}>
          <div className="edit-profile-cancel">X</div>
        </Link>
      </div>
      <div className="edit-profile-body">
        <form className="edit-profile-form" onSubmit={e => onSubmit(e)}>
          <Label for="username">
            <Translate id="edit_profile.username" />
          </Label>

          <Translate>
            {({ translate }) => (
              <input
                className="edit-profile-form-input"
                type="text"
                name="username"
                maxLength="30"
                value={username}
                placeholder={translate("edit_profile.username_placeholder")}
                onChange={e => onChange(e)}
              />
            )}
          </Translate>

          <Label for="profile_pictures">
            <Translate id="edit_profile.profile_pictures" />
          </Label>

          <div className="edit-profile-pictures-container">
            {profilePicsArray.map((picture, index) => (
              <div key={index} className="profile-pics-thumbnail-container">
                <img
                  className="profile-pics-thumbnail"
                  src={picture}
                  onError={addDefaultSrc}
                  alt="profile pictures"
                />
                <div className="profile-pic-thumbnail-filter"></div>
                <div
                  className="profile-pics-thumbnail-delete"
                  onClick={e => deletePicOfArray(index)}
                >
                  X
                </div>
              </div>
            ))}
          </div>

          <div className="edit-profile-add-pictures">
            <Translate>
              {({ translate }) => (
                <input
                  className="add-picture-input"
                  type="text"
                  placeholder={translate("edit_profile.add_pic_placeholder")}
                  name="new_profile_pic"
                  value={new_profile_pic}
                  onChange={e => onChange(e)}
                />
              )}
            </Translate>

            <button
              disabled={addPicDisabled}
              className="add-picture-button"
              onClick={addPicToArray}
            >
              <Translate id="edit_profile.add_picture" />
            </button>
          </div>
          {errorMsg ? (
            <Translate>
              {({ translate }) => (
                <Alert color="danger">
                  {translate(`error_messages.${errorMsg}`)}
                </Alert>
              )}
            </Translate>
          ) : null}
          <Translate>
            {({ translate }) => (
              <input
                type="submit"
                className="edit-profile-button-submit"
                value={translate("edit_profile.submit")}
              />
            )}
          </Translate>
        </form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default withLocalize(
  connect(
    mapStateToProps,
    { editProfile, clearErrors }
  )(withRouter(EditProfile))
);
