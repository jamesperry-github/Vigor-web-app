import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { getData } from './requests/request';
import Nav from './components/navigation/navbar';
import NoPathMatch from './components/navigation/no-path-match';
import Home from './components/home';
import Login from './components/authentication/login';
import SignUp from './components/authentication/signup';

export default class App extends Component {
  routing = () => {
    return (
      <Router>
        <Fragment>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
            {/* <Route path="/logout" component={Logout} />
            <Route exact path="/sign-up" component={SignUp} />
            <PrivateRoute exact path="/about" component={aboutPage} />
            <PrivateRoute exact path="/view-all" component={allPostsPage} />
            <PrivateRoute exact path="/players" component={AllPlayersPage} />
            <PrivateRoute exact path="/players/:playerid" component={IndividualPlayersPage} /> */}
            <Route component={NoPathMatch} />
          </Switch>
        </Fragment>
      </Router>
    );
  }

  render() {
    return this.routing();
  }
};

// class PrivateRoute extends Component {
//   render() {
//     return (
//       <Route {...propsToPass} render={props => (
//         isLoggedIn() ? (
//           <Component {...props} />
//         ) : (
//             <Redirect to={{
//               pathname: '/login',
//               state: { from: props.location }
//             }} />
//           )
//       )} />
//     )
//   }
// }