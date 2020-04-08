import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getArticlesPT, getArticlesEN } from "../../actions/articleActions";
import PropTypes from "prop-types";
import { prettyDateNoHours } from "../../Utils/Utils";

import { withLocalize, Translate } from "react-localize-redux";

class ArticleFeed extends Component {
  static propTypes = {
    getArticlesPT: PropTypes.func.isRequired,
    getArticlesEN: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
  };

  componentDidMount() {
    window.scrollTo(0, 0);
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
    ev.target.src = "/Assets/img_load_fail.png";
  }

  render() {
    const loading_img = [1, 2, 3, 4, 5, 6];
    const { articles } = this.props.article; //pulling out articles from this.props.article, so that I dont have to write this.props.article.articles all the time
    return !articles ? (
      <div className="article-feed-main-box-element">
        <ListGroup className="article-feed-wrapper">
          {loading_img.map((img, index) => (
            <ListGroupItem key={index} className="article-feed__item">
              <img
                style={{ opacity: "0.35" }}
                src="https://i.imgur.com/QIEpaf6.png"
                alt=""
              />
              <div className="article-feed__item__img-filter"></div>
              <div className="article-feed__item__fake-text">
                <h3 className="article-title">&nbsp;</h3>
                <h3 className="article-title">&nbsp;</h3>
                <time>&nbsp;</time>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    ) : (
      <div className="article-feed-main-box-element">
        <ListGroup className="article-feed-wrapper">
          {articles.map(({ _id, title, date, author, feed_img }) => (
            <ListGroupItem key={_id} className="article-feed__item">
              <img src={feed_img} onError={this.addDefaultSrc} alt="" />
              <div className="article-feed__item__img-filter"></div>
              <div className="article-feed__item__text">
                <h3 className="article-title">
                  <Link to={`/articles/${_id}`} className="article-title link">
                    {title}
                  </Link>
                </h3>
                <time dateTime={date}>
                  §}> {prettyDateNoHours(date)},{" "}
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
