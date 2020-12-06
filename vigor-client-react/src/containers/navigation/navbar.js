import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { logout } from '../../config/session';

export default function Nav() {
  const hist = useHistory();
  const dispatch = useDispatch();
  const IsLogged = useSelector(state => state.IsLogged);

  const navLink = (link, description) => {
    if (IsLogged) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to={link}>{description}</Link>
        </li>
      )
    } else return;
  };

  const authBtn = () => {
    if (IsLogged) {
      return (
        <li className="nav-item">
          <Link
            className="nav-link"
            to=""
            onClick={() => {
              hist.push("/login");
              logout();
              dispatch({ type: "LOG_OUT" })
              //setIsLogged(false);
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

  const signupBtn = () => {
    if (!IsLogged) {
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

  const pullRight = () => {
    return (
      <ul className="nav">
        {navLink("/profile", "My Profile")}
        {signupBtn()}
        {authBtn()}
      </ul>
    )
  }


  return (
    <nav className="navbar-dark bg-dark">
      <h3
        className="nav-h3"
        style={{
          display: "inline",
          padding: ".5rem 2rem",
          color: "white",
          cursor: "pointer"
        }}
        onClick={() => window.location.replace("/")}
      >Vigor</h3>
      <div className="navbar">
        <ul className="nav">
          {navLink("/", "Home")}
          {navLink("/", "About")}
          {/* {navLink("/my-recipes", "My Recipes")} */}
          {navLink("/search-recipes", "Search Recipes")}
          {navLink("/", "Task Scheduler")}
          {navLink("/", "Contact Us")}
        </ul>
        {pullRight()}
      </div>
    </nav>
  )
};

// export default class Nav extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isNav: false,
//     }
//   };

//   navLink = (link, description) => {
//     if (checkLogin()) {
//       return (
//         <li className="nav-item">
//           <Link className="nav-link" to={link}>{description}</Link>
//         </li>
//       )
//     } else return;
//   };

//   authBtn = () => {
//     if (checkLogin()) {
//       return (
//         <li className="nav-item">
//           <Link
//             className="nav-link"
//             to=""
//             onClick={() => {
//               window.location.replace("/login");
//               logout();
//             }}>Logout</Link>
//         </li>
//       )
//     } else {
//       return (
//         <li className="nav-item">
//           <Link
//             className="nav-link"
//             to="/login"
//           >Login</Link>
//         </li>
//       )
//     }
//   }

//   signupBtn = () => {
//     if (!checkLogin()) {
//       return (
//         <li className="nav-item">
//           <Link
//             className="nav-link"
//             to="/sign-up"
//           >Sign Up</Link>
//         </li>
//       )
//     }
//   }

//   pullRight = () => {
//     return (
//       <ul className="nav">
//         {this.navLink("/profile", "My Profile")}
//         {this.signupBtn()}
//         {this.authBtn()}
//       </ul>
//     )
//   }

//   render() {
//     return (
//       <nav className="navbar-dark bg-dark">
//         <h3
//           className="nav-h3"
//           style={{
//             display: "inline",
//             padding: ".5rem 2rem",
//             color: "white",
//             cursor: "pointer"
//           }}
//           onClick={() => window.location.replace("/")}
//         >Vigor</h3>
//         <div className="navbar">
//           <ul className="nav">
//             {this.navLink("/", "Home")}
//             {this.navLink("/", "About")}
//             {/* {this.navLink("/my-recipes", "My Recipes")} */}
//             {this.navLink("/search-recipes", "Search Recipes")}
//             {this.navLink("/", "Task Scheduler")}
//             {this.navLink("/", "Contact Us")}
//           </ul>
//           {this.pullRight()}
//         </div>
//       </nav>
//     )
//   };
// }