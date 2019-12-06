import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { withLocalize } from "react-localize-redux";

const LanguageToggle = ({
  props,
  languages,
  activeLanguage,
  setActiveLanguage
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="button-form-top languages">
        Languages
      </DropdownToggle>
      <DropdownMenu className="language-modal">
        {languages.map(lang => (
          <DropdownItem key={lang.code}>
            <button onClick={() => setActiveLanguage(lang.code)}>
              {lang.name}
            </button>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default withLocalize(LanguageToggle);
