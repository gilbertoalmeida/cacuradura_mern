import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { prettyDateNoHours } from "../../Utils/Utils";
import { withLocalize, Translate } from "react-localize-redux";
import EmptyArticleFeed from "./EmptyArticleFeed";

const ArticleFeed = ({ articles }) => {
  const addDefaultSrc = ev => {
    ev.target.src = "/Assets/img_load_fail.png";
  };

  return !articles ? (
    <EmptyArticleFeed />
  ) : (
    <div className="article-feed-main-box-element">
      <ListGroup className="article-feed-wrapper">
        {articles.map(({ _id, title, date, author, feed_img }) => (
          <ListGroupItem key={_id} className="article-feed__item">
            <img src={feed_img} onError={addDefaultSrc} alt="" />
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
};

export default withLocalize(ArticleFeed);
