import React, { Fragment, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { logout } from '../../config/session';
import * as icons from '../../components/icons';

export default function Nav() {
  const hist = useHistory();
  const dispatch = useDispatch();
  const IsLogged = useSelector(state => state.IsLogged);

  const navLink = (link, description, icon) => {
    if (IsLogged) {
      return (
        <Fragment>
          <Link
            className="sidenav-link"
            to={link}
          >{icon}&nbsp;&nbsp;{description}</Link>
        </Fragment>
      )
    } else return;
  };

  const authBtn = () => {
    if (IsLogged) {
      return (
        <Link
          className="right-nav-link"
          to=""
          onClick={() => {
            hist.push("/login");
            logout();
            dispatch({ type: "LOG_OUT" });
          }}>Logout</Link>
      )
    } else {
      return (
        <Link
          className="right-nav-link"
          to="/login"
        >Login</Link>
      )
    }
  }

  const signupBtn = () => {
    if (!IsLogged) {
      return (
        <Link
          className="right-nav-link"
          to="/sign-up"
        >Sign Up</Link>
      )
    }
  }

  const rightNav = () => {
    return (
      <div className="right-nav">
        {authBtn()}
        {signupBtn()}
        <Link className="right-nav-link" to={"/profile"}>My Profile</Link>
      </div>
    )
  }

  return (
    <div>
      <div className="command-bar">
        <span className="brand">Vigor</span>
        {rightNav()}
      </div>
      <div className="sidenav">
        <div className="sidenav-close"><button>{"<"}</button></div>
        {navLink("/", "Home", icons.home)}
        {navLink("/", "About", icons.about)}
        {/* {navLink("/my-recipes", "My Recipes")} */}
        {navLink("/search-recipes", "Search Recipes", icons.search)}
        {navLink("/", "Task Scheduler", icons.taskScheduler)}
        {navLink("/", "Contact Us", icons.contactUs)}
      </div>
    </div>
  )
};