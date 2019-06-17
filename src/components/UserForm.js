import React from "react";
// import UserFormDetails from "./UserFormDetails";

//**** took care of netlify bugs */
import {  Form, FormGroup } from "reactstrap";
import Ripples from 'react-ripples'
import { Textbox } from 'react-inputs-validation';
// import { Radiobox } from 'react-inputs-validation';


// import '../App.css'
import "./UserFormCss.css";

class UserForm extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    bio: "",
    image_url: "",
    hourly_rate: "",
    user_type: ""
  };

  // nextStep = () => {
  //   const {step} = this.state;
  //   this.setState({
  //     step: step + 1
  //   });
  // }


// nextStep = () => {
//   const {step} = this.state;
//   this.setState({
//     step: step + 1
//   });
// }

// //go back
// prevStep = () => {
//   const {step} = this.state;
//   this.setState({
//     step: step - 1
//   });
// }
  handleChange = input => e => {
    e.preventDefault();
    this.setState({[input]: e.target.value})
  }


  // // original handleChange
  // handleChange = e => {
  //   this.setState({
  //     ...this.state,
  //     [e.target.name]: e.target.value
  //   });
  // };


  submitUser = e => {
    e.preventDefault();
    let userInfo = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      bio: this.state.bio,
      user_type: this.state.user_type,
      image_url: this.state.image_url,
      hourly_rate: this.state.hourly_rate

    };
    this.props.postUserInfo(userInfo);
  };

  render() {
    console.log("user form props", this.props);
    console.log("user form state", this.state);
    return (
      <div className="main">
        <div className="trip-form-container">
          <div className="trip-form-background" />
          <h1>Register</h1>
          <Form className="trip-form" onSubmit={this.submitUser}>
            <FormGroup className="form-group">
              <div className="label-section">
                <Textbox
                  label="First Name"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  placeholder="First Name"
                  onChange={this.handleChange}
                  className="user-input"
                />
                <Textbox
                  label="Last Name"
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  className="user-input"
                />
                <Textbox
                  label="Email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.handleChange}
                  className="user-input"
                />
                <Textbox
                  label="Username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  placeholder="Username"
                  onChange={this.handleChange}
                  className="user-input"
                />
                <Textbox
                  label="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.handleChange}
                  className="user-input"
                />
                <Textbox
                  label="Bio"
                  type="text"
                  name="bio"
                  value={this.state.bio}
                  placeholder="Bio"
                  onChange={this.handleChange}
                  className="user-input"
                />
                <Textbox
                  label="image_url"
                  type="text"
                  name="image_url"
                  value={this.state.image_url}
                  placeholder="Image URL"
                  onChange={this.handleChange}
                  className="user-input"
                />
                <Textbox
                  label="hourly_rate"
                  type="int"
                  name="hourly_rate"
                  value={this.state.hourly_rate}
                  placeholder="Hourly Rate"
                  onChange={this.handleChange}
                  className="user-input"
                />
                <Textbox
                  label="user_type"
                  type="text"
                  name="user_type"
                  value={this.state.user_type}
                  placeholder="user type"
                  onChange={this.handleChange}
                  className="user-input"
                />


                {/* <Radiobox
                  // id="user_id"
                  label="user_type"
                  type="text"
                  name="user_type"
                  value={this.state.user_type}
                  placeholder="User Type"
                  onChange={this.handleChange}
                  className="user-input"
                  optionList={[
                    { id: "user_type", name: "Expert" },
                    { id: "user_type", name: "Asker" }
                  ]}
                  customStyleContainer={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "4%"
                  }} // Optional.[Object].Default: {}.
                  customStyleOptionListItem={{ marginRight: "20px" }} // Optional.[Object].Default: {}.
                  // onChange={(user_type, e) =>{
                  //   this.setState({ user_type });
                  //   console.log(e);
                  // }} // Required.[Func].Default: () => {}. Will return the value.
                  onBlur={e => {
                    console.log(e);
                  }} // Optional.[Func].Default: none.
                  validationOption={{
                    name: "user_type", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your .
                    check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                    required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                  }}
                /> */}
              </div>
            </FormGroup>


            {/* Ripple Button */}
            <Ripples color="#fff" during={1200}>
              <button
                type="button"
                onClick={this.submitUser}
                className="btn btn-outline-primary"
              >
                Enter
              </button>
            </Ripples>
          </Form>
        </div>
      </div>
    );
  }
}

export default UserForm;
