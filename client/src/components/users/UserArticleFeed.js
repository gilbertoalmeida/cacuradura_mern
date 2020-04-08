import React, { useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserArticles } from "../../actions/articleActions";
import PropTypes from "prop-types";

import { withLocalize, Translate } from "react-localize-redux";

const UserArticleFeed = ({
  loadedUserID,
  getUserArticles,
  article: { articles, loading }
}) => {
  useEffect(() => {
    getUserArticles(loadedUserID);
  }, [getUserArticles, loadedUserID]);

  function addDefaultSrc(ev) {
    ev.target.src = "/Assets/img_load_fail.png";
  }

  const loading_img = [1, 2, 3, 4, 5, 6];

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
            <img src={feed_img} onError={addDefaultSrc} alt="" />
            <div className="article-feed__img-filter"></div>
            <div className="article-feed__item__text">
              <h3 className="article-title">
                <Link to={`/articles/${_id}`} className="article-title link">
                  {title}
                </Link>
              </h3>
              <time dateTime={date}>
                §}>{" "}
                {new Date(date).getDate() +
                  "/" +
                  (new Date(date).getMonth() + 1) +
                  "/" +
                  new Date(date).getFullYear()}
                , <Translate id="article.by"></Translate>{" "}
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
};

UserArticleFeed.propTypes = {
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default withLocalize(
  connect(
    mapStateToProps,
    { getUserArticles }
  )(UserArticleFeed)
);
