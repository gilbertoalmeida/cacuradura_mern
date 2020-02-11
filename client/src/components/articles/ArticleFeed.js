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
    ev.target.src =
      "https://lh3.googleusercontent.com/g1geQPY-XS-ULU80VXCyAlG2aqEwkIPdbAZcfdLlMHqdqcU36658P6v_beNBW7UTN9Q5zqVbsGr87NjqtiNh8aXqAtllrsTrE47fSpEgh1eCpK4FgjaftXSS0ijWG43RQhrZVVCTCKtC25gEpg43Ag_CnjSlZzPZmtJW0Mxwf0LkBfhbZt690KngyeWt-6uf2o8zjl2hxZAOxIARUl-NiXaIlZ0nlM_s-mA_OOSr89itUv7e5um2zFGyD39X6wUrulHjttqyaNRDMCnNbNAZ_LGsYQo2zR5CnjZhiZJWt0PkAJ80Ui7GerZLUYw4TQuwSnkT9ipozb3E0V7s9I64-2ZqE5-zoHbPoqpEdMZ_6NI-TitQA0jFMttcVdfiVkXhbT4JM-SSdW_p99iwM0uzRTgknq3mXdYKbTvEDX3xS-n55UhTk7qOz5OIZCVAO54q4B4paEyxuaByJaSOSPyj6Yud0qf9U-VtrJ2bbqrGnvGhoFBce0sEUSyxCzVm5_iqv80iKf3gXpeeyaImoVorCUBDqiCqbrSATKoLqcDLqsbvbWSK44-SnMmB39oMgHfs3Riab50d0faSQfDRAXfinkynILVcoeTiwtRcxt8rEfi_fpbzpXQeyYFg9eHFHkHgNUTE47ITCxKNGdehoktpm5COQ-QXG4rA6WFL1fqFaMjh5CaIv0MFNA=w1319-h660-no";
  }

  render() {
    const { articles, loading } = this.props.article; //pulling out articles from this.props.article, so that I dont have to write this.props.article.articles all the time
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
              <img src={feed_img} onError={this.addDefaultSrc} alt="" />
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
