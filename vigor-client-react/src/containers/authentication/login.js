import React, { Component } from 'react';
import { login } from '../../config/session';
import { formInput, formGroupWrapper } from '../helper/helper';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false,
      loading: false,
      error: '',
      UserDetails: {
        Username: "",
        Password: "",
      },
    };
  }

  handleInputChange = async (e, key) => {
    let { value } = e.target;
    let UserDetails = { ...this.state.UserDetails };
    UserDetails[key] = value;
    await this.setState({ UserDetails });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { submitted, UserDetails } = this.state;
    let { Username, Password } = UserDetails;
    await this.setState({ submitted: true });
    if (Username !== "" && Password !== "") {
      let response = await login(Username, Password);
      if (response[0] && response[0].ok) {
        await response[1].then(user => sessionStorage.setItem("LOGGED_IN_USER", JSON.stringify(user[0])));
        window.location.replace("/"); // try and make seemless
      } else {
        this.setState({ error: "Invalid username or password" });
      }
    }
  }

  cardContent = () => {
    let { submitted, error, UserDetails } = this.state;
    let { Username, Password } = UserDetails;
    return (
      <form name="form"
        onSubmit={this.handleSubmit}
      >
        {formGroupWrapper("Username", formInput("Username", Username, this.handleInputChange, submitted))}
        {formGroupWrapper("Password", formInput("Password", Password, this.handleInputChange, submitted))}
        <div className="form-group">
          <button
            className="btn btn-primary">Login</button>
        </div>
        {error &&
          <div className={'alert alert-danger'}>{error}</div>
        }
      </form>
    )
  }

  render() {
    return (
      <div className="login container">
        <div className="login full-card">
          <div className="login card">
            <div className="card-header">
              <h5 className="card-title">Login</h5>
            </div>
            <div className="card-body">
              {this.cardContent()}
            </div>
          </div>
        </div>
      </div >
    )
  }
};