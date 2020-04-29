import React from "react";

const LoadingArticleFeed = () => {
  const loading_img = [1, 2, 3, 4, 5, 6];

  return (
    <div className="article-feed-main-box-element">
      <div className="article-feed-wrapper">
        {loading_img.map(index => (
          <div key={index} className="article-feed__item">
            <img
              style={{ opacity: "0.35" }}
              src="https://i.imgur.com/QIEpaf6.png"
              alt=""
            />
            <div className="article-feed__item__img-filter"></div>
            <div className="article-feed__item__loading-text">
              <h3 className="article-title">&nbsp;</h3>
              <h3 className="article-title">&nbsp;</h3>
              <time>&nbsp;</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingArticleFeed;
