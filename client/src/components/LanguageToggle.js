import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { withLocalize, Translate } from "react-localize-redux";

const LanguageToggle = ({ languages, setActiveLanguage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

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
              }}
            >
              <img
                src={`/Assets/${lang.icon}`}
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
