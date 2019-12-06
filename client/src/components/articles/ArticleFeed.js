import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getArticles } from "../../actions/articleActions";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

import { withLocalize, Translate } from "react-localize-redux";

class ArticleFeed extends Component {
  static propTypes = {
    getArticles: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getArticles();
  }

  render() {
    const { articles } = this.props.article; //pulling out articles from this.props.article, so that I dont have to write this.props.article.articles all the time
    return (
      <Container className="main-box-element">
        <ListGroup>
          {articles.map(({ _id, title, date, author, body }) => (
            <ListGroupItem key={_id} className="article-list-group-item">
              <div>
                <Link to={`/articles/${_id}`} className="article-title link">
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
                  <Link to={`/users/${author._id}`} className="user-link link">
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
                <div className="article-body">{ReactHtmlParser(body)}</div>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getArticles }
  )(ArticleFeed)
);
