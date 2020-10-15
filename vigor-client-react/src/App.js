import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { getData } from './requests/request';
import Nav from './containers/navigation/navbar';
import NoPathMatch from './containers/navigation/no-path-match';
import Home from './containers/home';
import Login from './containers/authentication/login';
import SignUp from './containers/authentication/signup';
import Profile from './containers/profile';
import Recipes from './containers/recipes/recipes';

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
            <Route path="/profile" component={Profile} />
            <Route path="/recipes" component={Recipes} />
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