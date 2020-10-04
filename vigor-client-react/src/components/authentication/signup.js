import React, { Component } from 'react';
import { login } from '../../config/session';
import { postData } from '../../requests/request';
import { formInput, formGroupWrapper } from '../helper/helper';

export default class SignUp extends Component {
  initialState = () => {
    return (
      {
        submitted: false,
        loading: false,
        error: '',
        UserDetails: {
          Username: "",
          Password: "",
          Email: "",
          FirstName: "",
          LastName: "",
          Age: "",
          Height: "",
          Weight: "",
          ActivityLevelId: "",
        },
      }
    )
  }
  constructor(props) {
    super(props);

    this.state = this.initialState();
  }

  handleInputChange = async (e, key) => {
    let { value } = e.target;
    let UserDetails = { ...this.state.UserDetails };
    UserDetails[key] = value;
    await this.setState({ UserDetails });
    //console.log("checking input...", key, this.state.UserDetails);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { submitted, UserDetails } = this.state;
    //let { Username, Password } = UserDetails;
    let path = "api/PrincipalUser";
    UserDetails.ActivityLevelId = 4;
    UserDetails.Age = parseInt(UserDetails.Age);
    console.log("CHECK DTO", UserDetails);
    let response = await postData(path, UserDetails).then(data => data). catch(err => console.error(err));
    console.log("REEEsponse", response);

    // await this.setState({ submitted: true });
    // if (Username !== "" && Password !== "") {
    //   await login(Username, Password);
    //   window.location.replace("/"); // try and make seemless
    // }
  }

  cardContent = () => {
    let { submitted, error, UserDetails } = this.state;
    let {
      Username,
      Password,
      Email,
      FirstName,
      LastName,
      Age,
      Height,
      Weight,
      ActivityLevelId,
    } = UserDetails;
    return (
      <form name="form"
        onSubmit={this.handleSubmit}
      >
        {formGroupWrapper("Username", formInput("Username", Username, this.handleInputChange, submitted))}
        {formGroupWrapper("Password", formInput("Password", Password, this.handleInputChange, submitted))}

        {formGroupWrapper("Email", formInput("Email", Email, this.handleInputChange, submitted))}
        {formGroupWrapper("FirstName", formInput("FirstName", FirstName, this.handleInputChange, submitted))}
        {formGroupWrapper("LastName", formInput("LastName", LastName, this.handleInputChange, submitted))}
        {formGroupWrapper("Age", formInput("Age", Age, this.handleInputChange, submitted))}
        {formGroupWrapper("Height", formInput("Height", Height, this.handleInputChange, submitted))}
        {formGroupWrapper("Weight", formInput("Weight", Weight, this.handleInputChange, submitted))}
        {formGroupWrapper("Activity Level", null)}
        <div className="form-group">
          <button
            className="btn btn-primary">Create</button>
        </div>
        {error &&
          <div className={'alert alert-danger'}>{error}</div>
        }
      </form>
    )
  }

  render() {
    return (
      <div className="signup container">
        <div className="signup full-card">
          <div className="signup card">
            <div className="card-header">
              <h5 className="card-title">Create a new account!</h5>
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