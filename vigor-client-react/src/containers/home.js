import React, { Component } from 'react';
import { checkLogin } from '../config/session';


export default class Home extends Component {

  constructor() {
    super();

    this.state = {

    }
  }

  componentDidMount() {
    if (!checkLogin()) {
      this.props.history.push("/login");
    }
  }

  cardContent = () => {
    return (
      <div>
        <div className="card-header">
          <h5 className="card-title">Home Page</h5>
        </div>
        <div className="card-body">
          TODO: DASHBOARD
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="home container">
        <div className="home full-card">
          <div className="home card">
            {this.cardContent()}
          </div>
        </div>
      </div>
    )
  }
}