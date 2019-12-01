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

  return loading || user === null ? (
    <header>
      <h1>Loading</h1>
    </header>
  ) : (
    <Fragment>
      <header className="App-header">
        <h1>
          uma<span>cacura</span>
        </h1>
      </header>
      <div className="main-box-element">
        <Link to={`/users/${user._id}`} className="article-title link">
          Esse perfil é de: {user.username}
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
              Artigos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Imagens
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Container>
              {articles.length === 0 ? (
                <header>
                  <h2> {"><((((º>"}</h2>
                  <h2>Essa cacura ainda nao postou nenhum artigo</h2>
                </header>
              ) : (
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
                          , por{" "}
                          <Link
                            to={`/users/${author._id}`}
                            className="user-link link"
                          >
                            {author.username}
                          </Link>
                        </time>
                        {/* <Link className="link" to={`/articles/${_id}`}>
                          <img
                            src="/Assets/a-cacurice-vem.png"
                            alt="Foto de um girassol murcho com o scripting de'A cacurice vem' por cima"
                          ></img>
                        </Link> */}
                        <br />
                        <br />
                        <div className="article-body">
                          {ReactHtmlParser(body)}
                        </div>
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
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

export default connect(
  mapStateToProps,
  { getUser, getUserArticles }
)(UserPage);
