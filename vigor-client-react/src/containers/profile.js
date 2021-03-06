import React, { Component, Fragment } from 'react';
import { checkLogin } from '../config/session';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      Edit: false,
      UserDetails: sessionStorage.LOGGED_IN_USER ? JSON.parse(sessionStorage.LOGGED_IN_USER) : {},
    }
  }

  componentDidMount() {
    if (!checkLogin()) {
      this.props.history.push("/login");
    }
  }

  editBtn = () => {
    let { Edit } = this.state;
    return <button
      className="btn btn-dark"
      type="button"
      style={{ float: "right" }}
      onClick={() => this.setState({ Edit: !Edit })}
    >{Edit ? "Close" : "Edit"}</button>
  }

  listItm = (field, label) => {
    let { Edit } = this.state;
    if (Edit) {
      return (
        <li className="list-group-item"><b>{label}:</b>
          <input
            type="text"
            aria-label={label}
            className="form-control"
            value={field}
          />
        </li> // input
      )
    } else {
      return <li className="list-group-item"><b>{label}:</b><br /><span style={{ padding: "10px" }}>{field}</span></li>
    }
  }

  cardContent = () => {
    let {
      ActivityLevelId,
      Age,
      Email,
      Firstname,
      Height,
      Lastname,
      Password,
      UserId,
      Username,
      Weight,
    } = this.state.UserDetails;
    return (
      <div>
        <div className="card-header">
          <h5 className="card-title">Welcome, {Firstname}!{this.editBtn()}</h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {this.listItm(Username, "Username")}
            {this.listItm(Email, "Email")}
            {this.listItm(Firstname, "Firstname")}
            {this.listItm(Lastname, "Lastname")}
            {this.listItm(Age, "Age")}
            {this.listItm(Height, "Height (cm)")}
            {this.listItm(Weight, "Weight (lbs)")}
            {this.listItm(ActivityLevelId, "Activity Level")}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="profile container">
        <div className="profile full-card">
          <div className="profile card">
            {this.cardContent()}
          </div>
        </div>
      </div>
    );
  }
};