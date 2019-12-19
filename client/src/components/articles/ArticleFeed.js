import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getArticlesPT, getArticlesEN } from "../../actions/articleActions";
import PropTypes from "prop-types";

import { withLocalize, Translate } from "react-localize-redux";

class ArticleFeed extends Component {
  static propTypes = {
    getArticlesPT: PropTypes.func.isRequired,
    getArticlesEN: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.props.activeLanguage.code === "pt") {
        this.props.getArticlesPT();
      } else if (this.props.activeLanguage.code === "en") {
        this.props.getArticlesEN();
      }
    }, 5);

    /* THIS IS A HORRIBLE SOLUTION. I am waiting 5 miliseconds so that the props have the info on the
    active language code, otherwise it is still undefined. Think about something more elegant later */
  }

  addDefaultSrc(ev) {
    ev.target.src = "https://pbs.twimg.com/media/Bw8Kiy4CAAAhcy6.jpg";
  }

  render() {
    const { articles } = this.props.article; //pulling out articles from this.props.article, so that I dont have to write this.props.article.articles all the time
    return (
      <div className="main-box-element">
        <ListGroup className="article-feed-wrapper">
          {articles.map(({ _id, title, date, author, feed_img }) => (
            <ListGroupItem key={_id} className="article-feed-item">
              <img src={feed_img} onError={this.addDefaultSrc} alt="cat" />
              <div className="article-feed-img-filter"></div>
              <div className="article-feed-item-text">
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
                  <Translate id="article.by"></Translate>{" "}
                  <Link to={`/users/${author._id}`} className="user-link link">
                    {author.username}
                  </Link>
                </time>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getArticlesPT, getArticlesEN }
  )(ArticleFeed)
);
