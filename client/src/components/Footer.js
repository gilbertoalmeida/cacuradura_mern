import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { withLocalize, Translate } from "react-localize-redux";
import { Link } from "react-router-dom";
import RegisterModal from "./auth/RegisterModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Footer = ({ auth: { loggedUser } }) => {
  const [articleSearchInput, setArticleSearchInput] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    alert("The functionality will come :)");
  };

  return (
    <div className="footer-container">
      <div className="footer-container__vertical-center">
        <div className="footer-container__first-divider">
          <div className="footer-container__article-search">
            <Translate id="footer.search_call_to_action" />
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
                      placeholder={translate("footer.search_input_placeholder")}
                      onChange={e => {
                        setArticleSearchInput(e.target.value);
                      }}
                      className="footer-container__article-search__form__input"
                    />
                  )}
                </Translate>
              </FormGroup>
              <Button className="footer-container__article-search__form__button">
                <Translate id="footer.search_button" />
              </Button>
            </Form>
          </div>
          {!loggedUser ? (
            <div className="footer-container__registration">
              <Translate id="footer.sign_up_question" />
              <RegisterModal />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="footer-container__links">
          <div className="footer-container__links__privacy-policy">
            <Link to="/privacy-policy">
              <Translate id="footer.privacy_policy" />
            </Link>
          </div>
          <div className="footer-container__links__about">
            <Link to="/about">
              <Translate id="footer.about" />
            </Link>
          </div>
        </div>
        <div className="footer-container__social-media">
          <div className="footer-container__social-media__insta">
            <a
              href="https://www.instagram.com/cacuradura/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/Assets/insta_icon.png"
                alt="icon for sending an email"
              />
            </a>
          </div>
          <div className="footer-container__social-media__twitter">
            <a
              href="https://twitter.com/cacuradura"
              target="_blank"
              rel="noopener noreferrer"
            >
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
      </div>
    </div>
  );
};

Footer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withLocalize(connect(mapStateToProps)(Footer));
