import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <a href="/">
        <img
          className="header__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
      </a>
    </div>
  );
}

export default Header;
