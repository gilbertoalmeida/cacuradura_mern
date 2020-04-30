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
import { addErrorSrc } from "../../Utils/Utils";

const EditProfile = ({
  auth: { isAuthenticated, loggedUser, token, editing_profile },
  error,
  editProfile,
  clearErrors
}) => {
  const [username, setUsername] = useState("");
  const [usernameMsg, setUsernameMsg] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState("");
  const [profilePicsArray, setProfilePicsArray] = useState([]);
  const [addPicDisabled, setAddPicDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

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
    setUsername(!isAuthenticated || !loggedUser ? "" : loggedUser.username);
    setProfilePicsArray(
      !isAuthenticated || !loggedUser ? [] : loggedUser.profile_pictures
    );
  }, [isAuthenticated, loggedUser]);

  useEffect(() => {
    if (profilePicsArray.length >= 9 || newProfilePic === "") {
      setAddPicDisabled(true);
    } else {
      setAddPicDisabled(false);
    }
  }, [profilePicsArray, newProfilePic]);

  const onChangeUsername = e => {
    let editedUsername = e.target.value
      .replace(/[^a-zA-Z0-9_.]/gi, "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");

    if (editedUsername !== e.target.value) {
      setUsernameMsg("username-wrong-msg");
    } else {
      setUsernameMsg(null);
    }

    setUsername(editedUsername);
  };

  useEffect(() => {
    if (username.length === 30) {
      setUsernameMsg("username-max-msg");
    } else {
      setUsernameMsg(null);
    }
  }, [username]);

  const onChangePictures = e => {
    setNewProfilePic(e.target.value);
  };

  const addPicToArray = e => {
    e.preventDefault();

    setProfilePicsArray(profilePicsArray => [
      ...profilePicsArray,
      newProfilePic
    ]);
    setNewProfilePic("");
  };

  const deletePicOfArray = index => {
    let toBeRemoved = profilePicsArray.splice(index, 1);
    setProfilePicsArray(profilePicsArray.filter(e => e !== toBeRemoved));
  };

  const onSubmit = e => {
    e.preventDefault();
    editProfile(username, profilePicsArray, loggedUser._id);
  };

  return !isAuthenticated && !token ? (
    <PleaseLogin />
  ) : (
    <div className="edit-profile-main-box-element">
      <div className="edit-profile-header">
        <h5 className="edit-profile-title">
          <Translate id="edit_profile.title" />
        </h5>
        <Link to={`/${isAuthenticated ? "users/" + loggedUser.username : ""}`}>
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
                style={{ borderColor: usernameMsg ? "#f02d0a" : "#05050a" }}
                className="edit-profile-form-input"
                type="text"
                name="username"
                maxLength="30"
                value={username}
                placeholder={translate("edit_profile.username_placeholder")}
                onChange={e => onChangeUsername(e)}
              />
            )}
          </Translate>
          {usernameMsg ? (
            <div className="input-msg">
              <Translate id={`registermodal.${usernameMsg}`} />
            </div>
          ) : null}

          <Label className="mt-4" for="profile_pictures">
            <Translate id="edit_profile.profile_pictures" />
          </Label>

          <div className="edit-profile-pictures-container">
            {profilePicsArray.map((picture, index) => (
              <div key={index} className="profile-pics-thumbnail-container">
                <img
                  className="profile-pics-thumbnail"
                  src={picture}
                  onError={addErrorSrc}
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
                  value={newProfilePic}
                  onChange={e => onChangePictures(e)}
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
                value={translate(
                  `edit_profile.${
                    editing_profile
                      ? "editing_button"
                      : error.msg.msg
                      ? "try_again_button"
                      : "submit_button"
                  }`
                )}
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
