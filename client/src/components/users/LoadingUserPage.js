import React, { Fragment, useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { withLocalize, Translate } from "react-localize-redux";

import ArticleFeed from "../articles/ArticleFeed";

const LoadingUserPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Fragment>
      <div
        style={{ opacity: "0.45" }}
        className="user-profile-main-box-element"
      >
        <div className="profile-pic-container">
          <img
            className="profile-pic-focus"
            src="https://i.imgur.com/JqJnHVu.png"
            alt="profile pic"
          />
          <div className="profile-pic-filter"></div>
        </div>
        <div className="profile-header">
          <div className="user-profile-loading-title">&nbsp;</div>
          <div className="user-profile-loading-counters">
            <div className="some-counter"></div>
            <div className="article-counter">&nbsp;</div>
            <div className="another-counter"></div>
          </div>
          <div className="user-profile-loading-button">&nbsp;</div>
        </div>
      </div>

      <div className="main-box-element">
        <Nav
          tabs
          style={{ opacity: "0.45" }}
          className="justify-content-center user-nav-tabs"
        >
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
              <ArticleFeed />
            </Fragment>
          </TabPane>
        </TabContent>
      </div>
    </Fragment>
  );
};

export default withLocalize(LoadingUserPage);
