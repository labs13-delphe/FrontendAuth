import React from "react";

class UserForm extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    bio: "",
    user_type: "",
    image_url: "",
    hourly_rate: ""
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  submitUser = e => {
    e.preventDefault();
    this.setState({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      username: this.state.username,
      bio: this.state.bio,
      user_type: this.state.user_type,
      image_url: this.state.image_url,
      hourly_rate: this.state.hourly_rate
    });
  };

  render() {
    return (
      <div>
        <h2>User Form</h2>
        <form onSubmit={this.props.submitUser} className="user-form">
          <input
            label="First Name"
            type="text"
            name="first_name"
            value={this.state.first_name}
            placeholder="First Name"
            onChange={this.handleChange}
            className="user-input"
          />
          <input
            label="Last Name"
            type="text"
            name="last_name"
            value={this.state.last_name}
            placeholder="Last Name"
            onChange={this.handleChange}
            className="user-input"
          />

          <input
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleChange}
            className="user-input"
          />
          <input
            label="Username"
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Username"
            onChange={this.handleChange}
            className="user-input"
          />
          <input
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleChange}
            className="user-input"
          />
          <input
            label="Bio"
            type="text"
            name="bio"
            value={this.state.bio}
            placeholder="bio"
            onChange={this.handleChange}
            className="user-input"
          />
          <input
            label="user_type"
            type="text"
            name="user_type"
            value={this.state.user_type}
            placeholder="user_type"
            onChange={this.handleChange}
            className="user-input"
          />
          <input
            label="image_url"
            type="text"
            name="image_url"
            value={this.state.image_url}
            placeholder="image_url"
            onChange={this.handleChange}
            className="user-input"
          />
          <input
            label="hourly_rate"
            type="int"
            name="hourly_rate"
            value={this.state.hourly_rate}
            placeholder="hourly_rate"
            onChange={this.handleChange}
            className="user-input"
          />
          <button onClick={this.props.submitUser}>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserForm;

///firstname, lastname, email, username, password

//bio, img url, user_type, hourly_rate
