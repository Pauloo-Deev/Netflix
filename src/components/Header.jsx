import React from "react";
import { IoSearch } from "react-icons/io5";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <Router>
      <div className="header">
        <div>
          <a href="/">
            <img
              className="header__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix Logo"
            />
          </a>
        </div>
        <div className="search">
          <Link to="/movies/search" relative="path">
            <IoSearch className="icon-search" />
          </Link>
        </div>
      </div>
      <Switch>
        <Route path="/movies/search">

        </Route>
      </Switch>
    </Router>
  );
}

export default Header;
