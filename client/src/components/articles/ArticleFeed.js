import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getArticles } from "../../actions/articleActions";
import PropTypes from "prop-types";

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
      <Container>
        <ListGroup>
          {articles.map(({ _id, title, date, author, body }) => (
            <ListGroupItem>
              <div className="main-box-element">
                <Link to={`/articles/${_id}`} className="article-title link">
                  {title}
                </Link>
                <time datetime={date}>
                  <b>
                    §}> {date}, por {author.username}
                  </b>
                </time>
                <Link className="link" to={`/articles/${_id}`}>
                  <img
                    src="/Assets/a-cacurice-vem.png"
                    alt="Foto de um girassol murcho com o scripting de'A cacurice vem' por cima"
                  ></img>
                </Link>
                <br />
                <p>
                  {body + " "}
                  <Link to={`/articles/${_id}`} className="link">
                    [Leia mais]
                  </Link>
                </p>
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

export default connect(
  mapStateToProps,
  { getArticles }
)(ArticleFeed);
