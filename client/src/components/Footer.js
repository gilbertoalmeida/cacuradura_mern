import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { withLocalize, Translate } from "react-localize-redux";

const Footer = () => {
  const [articleSearchInput, setArticleSearchInput] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    alert("The functionality will come :)");
  };

  return (
    <div className="footer-container">
      <div className="footer-container__vertical-center">
        <div className="footer-container__article-search">
          <Translate id="article_search.call_to_action" />
          <Form
            onSubmit={onSubmit}
            className="footer-container__article-search__form"
          >
            <FormGroup>
              <Translate>
                {({ translate }) => (
                  <Input
                    type="text"
                    name="articleSearchInput"
                    value={articleSearchInput}
                    placeholder={translate("article_search.input_placeholder")}
                    onChange={e => {
                      setArticleSearchInput(e.target.value);
                    }}
                    className="footer-container__article-search__form__input"
                  />
                )}
              </Translate>
            </FormGroup>
            <Button className="footer-container__article-search__form__button">
              <Translate id="article_search.search_button" />
            </Button>
          </Form>
        </div>
        <div className="footer-container__social-media">
          <div className="footer-container__social-media__insta">
            <a href="https://www.instagram.com/cacuradura/" target="_blank">
              <img
                src="/Assets/insta_icon.png"
                alt="icon for sending an email"
              />
            </a>
          </div>
          <div className="footer-container__social-media__twitter">
            <a href="https://twitter.com/cacuradura" target="_blank">
              <img
                src="/Assets/twitter_icon.png"
                alt="icon for sending an email"
              />
            </a>
          </div>
          <div className="footer-container__social-media__mail">
            <a href="mailto:cacuradura@gmail.com">
              <img
                src="/Assets/mail_icon.png"
                alt="icon for sending an email"
              />
            </a>
          </div>
        </div>
        <div className="footer-container__links">Links</div>
      </div>
    </div>
  );
};

export default withLocalize(Footer);
