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

  return loading ? (
    <header>
      {/* I took this off, bc the loading message here is really ugly. I have to do the real loading page scene
        where loading squares appear in place. Maybe empty pink squares. And where the text is, there is a slight
        darker backgroung, as a loading text */}
      {/* <h1>
          <Translate id="article.loading" />
        </h1> */}
    </header>
  ) : (
    <div className="article-feed-main-box-element">
      <ListGroup className="article-feed-wrapper">
        {articles.map(({ _id, title, date, author, feed_img }) => (
          <ListGroupItem key={_id} className="article-feed-item">
            <img src={feed_img} onError={addDefaultSrc} alt="" />
            <div className="article-feed-img-filter"></div>
            <div className="article-feed-item-text">
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
