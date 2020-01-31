import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import classnames from "classnames";
import { getUser } from "../../actions/userActions";
import { getUserArticles } from "../../actions/articleActions";
import PropTypes from "prop-types";

import { withLocalize, Translate } from "react-localize-redux";

import ReactHtmlParser from "react-html-parser";

const UserPage = ({
  getUser,
  getUserArticles,
  user: { user },
  article: { articles, loading },
  match
}) => {
  useEffect(() => {
    getUser(match.params.id);
    getUserArticles(match.params.id);
  }, [getUser, getUserArticles, match.params.id]);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const profile_img = [
    "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    "https://upload.wikimedia.org/wikipedia/commons/5/59/That_Poppy_profile_picture.jpg",
    "https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg",
    "https://kprofiles.com/wp-content/uploads/2019/12/20019643.jpg"
  ];

  return loading || user === null ? (
    <header>
      <h1>Loading</h1>
    </header>
  ) : (
    <Fragment>
      <div className="user-profile-main-box-element">
        <img className="profile-pic-focus" src={profile_img[0]}></img>
        <div className="profile-header">
          <div className="user-profile-title">{user.username}</div>
        </div>
      </div>
      <header className="App-header">
        <h1>
          <Translate id="header.a(cacura)"></Translate>
          <span>cacura</span>
        </h1>
        <h2>
          <Translate id="header.still_working"></Translate>
        </h2>
      </header>
      <div className="main-box-element">
        <Link to={`/users/${user._id}`} className="article-title link">
          <Translate
            id="user_page.owner_phrase"
            data={{ owner: user.username }}
          ></Translate>
        </Link>
        <br />
        <Nav tabs className="justify-content-center user-nav-tabs">
          <NavItem className="user-nav-item">
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              <Translate id="user_page.articles"></Translate>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              <Translate id="user_page.pictures"></Translate>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Container>
              {articles.length === 0 ? (
                <header>
                  <h2> {"><((((º>"}</h2>
                  <h2>
                    {" "}
                    <Translate id="user_page.no_articles" />{" "}
                  </h2>
                </header>
              ) : (
                <>
                  <header>
                    <h2>
                      <Translate id="user_page.article_design" />{" "}
                    </h2>
                  </header>

                  <ListGroup>
                    {articles.map(({ _id, title, date, author, body }) => (
                      <ListGroupItem
                        key={_id}
                        className="article-list-group-item"
                      >
                        <div>
                          <Link
                            to={`/articles/${_id}`}
                            className="article-title link"
                          >
                            <h3 className="article-title">{title}</h3>
                          </Link>
                          <time dateTime={date}>
                            §}>{" "}
                            {new Date(date).getDate() +
                              "/" +
                              (new Date(date).getMonth() + 1) +
                              "/" +
                              new Date(date).getFullYear()}
                            <Translate id="article.by"></Translate>{" "}
                            <Link
                              to={`/users/${author._id}`}
                              className="user-link link"
                            >
                              {author.username}
                            </Link>
                          </time>
                          <br />
                          <br />
                          <div className="article-body">
                            {ReactHtmlParser(body)}
                          </div>
                        </div>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </>
              )}
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body className="pic-card">
                  <CardTitle>Primeira foto</CardTitle>
                  <CardText>
                    Uma foto pretenciosa com um leve filtro vermelho, tipo a que
                    tá nos artigos.
                  </CardText>
                </Card>
              </Col>
              <Col sm="6">
                <Card body className="pic-card">
                  <CardTitle>Segunda foto</CardTitle>
                  <CardText>
                    Um nudez artístico. <br></br> SIM! <br></br> Será permitida
                    nudez aqui <br></br> mORRE INSTAGRAM!
                  </CardText>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </Fragment>
  );
};

UserPage.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  article: state.article
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getUser, getUserArticles }
  )(UserPage)
);
