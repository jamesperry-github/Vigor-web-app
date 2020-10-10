import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { logout, checkLogin } from '../../config/session';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNav: false,
    }
  };

  navLink = (link, description) => {
    if (checkLogin()) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to={link}>{description}</Link>
        </li>
      )
    } else return;
  };

  authBtn = () => {
    if (checkLogin()) {
      return (
        <li className="nav-item">
          <Link
            className="nav-link"
            //to="/login"
            onClick={() => {
              window.location.replace("/login");
              logout();
            }}>Logout</Link>
        </li>
      )
    } else {
      return (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/login"
          >Login</Link>
        </li>
      )
    }
  }

  signupBtn = () => {
    if (!checkLogin()) {
      return (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/sign-up"
          >Sign Up</Link>
        </li>
      )
    }
  }

  pullRight = () => {
    return (
      <div className="nav-content">
        <ul className="nav">
          {this.navLink("/profile", "My Profile")}
          {this.signupBtn()}
          {this.authBtn()}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="nav-content">
          <h3
            className="nav-h3"
            style={{
              paddingLeft: "15px",
              color: "white",
              cursor: "pointer"
            }}
            onClick={() => window.location.replace("/")}
          >Vigor</h3>
          <ul className="nav">
            {this.navLink("/", "Home")}
            {this.navLink("/", "About")}
            {this.navLink("/", "My Recipes")}
            {this.navLink("/", "Contact Us")}
          </ul>
        </div>
        {this.pullRight()}
      </nav>
    )
  };
}