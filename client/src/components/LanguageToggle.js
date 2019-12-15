import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { withLocalize, Translate } from "react-localize-redux";

const LanguageToggle = ({
  props,
  languages,
  activeLanguage,
  setActiveLanguage
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const history = createBrowserHistory();

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="button-form-top languages">
        <Translate>
          {({ translate }) => (
            <img
              src={translate("authnavbar.lang_icon")}
              alt="country flag for language selection"
              width="30px"
              height="18px"
            ></img>
          )}
        </Translate>
      </DropdownToggle>
      <DropdownMenu className="language-modal">
        {languages.map(lang => (
          <DropdownItem key={lang.code}>
            <div
              onClick={() => {
                setActiveLanguage(lang.code);

                if (history.location.pathname === "/") {
                  window.location.reload();
                }
              }}
            >
              <img
                src={`/${lang.icon}`}
                alt="country flag for language selection"
                width="30px"
                height="18px"
              ></img>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default withLocalize(withRouter(LanguageToggle));
