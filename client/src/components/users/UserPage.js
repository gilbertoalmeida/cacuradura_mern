import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { getUser } from "../../actions/userActions";
import { getUserArticles } from "../../actions/articleActions";
import PropTypes from "prop-types";
import { withLocalize, Translate } from "react-localize-redux";

import UserArticleFeed from "./UserArticleFeed.js";

const UserPage = ({
  getUser,
  getUserArticles,
  user: { loadedUser },
  article: { articles, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getUser(match.params.id);
    getUserArticles(match.params.id);
  }, [getUser, getUserArticles, match.params.id]);

  const [activeTab, setActiveTab] = useState("1");
  const [pictureID, setPictureID] = useState(0);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  function addDefaultSrc(ev) {
    ev.target.src = "/Assets/img_load_fail.png";
  }

  return loading || loadedUser === null ? (
    <header>
      <h1>Loading</h1>
    </header>
  ) : (
    <Fragment>
      <div className="user-profile-main-box-element">
        <div className="profile-pic-container">
          {loadedUser.profile_pictures.length === 0 ? (
            <img
              className="profile-pic-focus"
              src="/Assets/no_profile_pic.png"
              onError={addDefaultSrc}
              alt="profile pic"
            />
          ) : (
            <img
              className="profile-pic-focus"
              src={loadedUser.profile_pictures[pictureID]}
              onError={addDefaultSrc}
              alt="profile pic"
            />
          )}

          <div className="profile-pic-nav-arrows">
            {pictureID === 0 ? null : (
              <img
                className="back-arrow"
                src="/Assets/back_pic.png"
                alt="left back arrow"
                onClick={() => {
                  setPictureID(pictureID - 1);
                }}
              />
            )}
            {pictureID === loadedUser.profile_pictures.length - 1 ||
            loadedUser.profile_pictures.length === 0 ? null : (
              <img
                className="next-arrow"
                src="/Assets/next_pic.png"
                alt="right next arrow"
                onClick={() => {
                  setPictureID(pictureID + 1);
                }}
              />
            )}
          </div>
        </div>
        <div className="profile-header">
          <div className="user-profile-title">{loadedUser.username}</div>
          <div className="user-profile-counters">
            <div className="some-counter"></div>
            <div className="article-counter">
              <Translate id="user_page.articles" /> <br />
              <span>{articles.length}</span>{" "}
            </div>
            <div className="another-counter"></div>
          </div>
          <div className="user-profile-buttons">
            {auth.isAuthenticated &&
            auth.isLoading === false &&
            auth.loggedUser._id === loadedUser._id ? (
              <Link to={`/users/edit_profile`}>
                <button className="profile-buttons edit-profile-button">
                  <Translate id="user_page.edit_profile"></Translate>
                </button>
              </Link>
            ) : (
              <button
                className="profile-buttons send-message-button"
                onClick={() => {
                  alert(
                    "Not done yet!! Will come in a later build of the site, if I don't change my mind 😅"
                  );
                }}
              >
                Message/testimonials?
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="main-box-element">
        <Nav tabs className="justify-content-center user-nav-tabs">
          <NavItem className="user-nav-item">
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              <Translate id="user_page.articles" />
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Fragment>
              {articles.length === 0 ? (
                <header>
                  <h2> {"><((((º>"}</h2>
                  <h2>
                    {" "}
                    <Translate id="user_page.no_articles" />{" "}
                  </h2>
                </header>
              ) : (
                <UserArticleFeed loadedUserID={loadedUser._id} />
              )}
            </Fragment>
          </TabPane>
        </TabContent>
      </div>
    </Fragment>
  );
};

UserPage.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  article: state.article,
  auth: state.auth
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getUser, getUserArticles }
  )(UserPage)
);
