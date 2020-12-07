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
  const [navDisplay, setNavDisplay] = useState(false);

  const navLink = (link, description = "", icon) => {
    return (
      <Fragment>
        <Link
          className="sidenav-link"
          to={link}
        >{icon}{navDisplay ? <span className="sidenav-link-name">{description}</span> : null}</Link>
      </Fragment>
    )
  };

  const authBtn = () => {
    if (IsLogged) {
      return (
        <Link
          className="right-nav-link"
          to=""
          onClick={() => {
            hist.push("/login");
            dispatch({ type: "LOG_OUT" });
            logout();
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
        {IsLogged ? <Link className="right-nav-link" to={"/profile"}>My Profile</Link> : null}
      </div>
    )
  }

  const brand = () => {
    let brandClass = "brand"
    if (!IsLogged || !navDisplay) {
      brandClass = "brand-closed"
    }
    return <span className={brandClass} onClick={() => window.location.replace("/")}>Vigor</span>
  }

  const sideNav = () => {
    if (IsLogged) {
      let navClass = "sidenav";
      let btnClass = "open";
      if (!navDisplay) {
        navClass = "sidenav-closed";
        btnClass = "closed";
      }
      return (
        <div className={navClass}>
          <div className="sidenav-close"><span className={btnClass} onClick={() => setNavDisplay(!navDisplay)}>{"<"}</span></div>
          {navLink("/", "Home", icons.home)}
          {navLink("/", "About", icons.about)}
          {/* {navLink("/my-recipes", "My Recipes")} */}
          {navLink("/search-recipes", "Search Recipes", icons.search)}
          {navLink("/", "Task Scheduler", icons.taskScheduler)}
          {navLink("/", "Contact Us", icons.contactUs)}
          <div style={{ borderTop: "1px solid black", margin: "1px", }}></div>
        </div>
      )
    }
  }

  return (
    <div>
      <div className="command-bar">
        {brand()}
        {rightNav()}
      </div>
      {sideNav()}
    </div>
  )
};