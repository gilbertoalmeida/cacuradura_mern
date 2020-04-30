import React from "react";
import { Link } from "react-router-dom";
import { prettyDateNoHours, addErrorSrc } from "../../Utils/Utils";
import { withLocalize, Translate } from "react-localize-redux";
import LoadingArticleFeed from "./LoadingArticleFeed";

const ArticleFeed = ({ articles }) => {
  return !articles ? (
    <LoadingArticleFeed />
  ) : (
    <div className="article-feed-main-box-element">
      <div
        className={`article-feed-wrapper ${
          articles.length > 2 ? "addColumns" : ""
        }`}
      >
        {articles.map(({ _id, title, date, author, coverImg }) => (
          <div
            key={_id}
            className={`article-feed__item${coverImg ? "" : "-no-img"}`}
          >
            {coverImg && <img src={coverImg} onError={addErrorSrc} alt="" />}
            {coverImg && <div className="article-feed__item__img-filter"></div>}

            <div
              className={`article-feed__item__text ${
                coverImg ? "addBlackShadow" : ""
              }`}
            >
              <h3 className="article-title">
                <Link to={`/articles/${_id}`} className="article-title link">
                  {title}
                </Link>
              </h3>
              <time dateTime={date}>
                §}> {prettyDateNoHours(date)},{" "}
                <Translate id="article.by"></Translate>{" "}
                <Link
                  to={`/users/${author.username}`}
                  className="user-link link"
                >
                  {author.username}
                </Link>
              </time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withLocalize(ArticleFeed);
