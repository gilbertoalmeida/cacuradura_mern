import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
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
    const { articles } = this.props.article; //pulling out articles from this.props.article, so that I dont have to write this.props.article.items all the time
    return (
      <Container>
        <ListGroup>
          {articles.map(({ _id, title }) => (
            <ListGroupItem>{title}</ListGroupItem>
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
