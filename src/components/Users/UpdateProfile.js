// Packages
import React from "react";
import axios from "axios";

axios.defaults.baseURL =
  process.env.API_URL || "https://delphe-backend.herokuapp.com/api";

class UserProfile extends React.Component {
  state = {
    user: {},
    isEditing: true
  };

  // ======== Get User Information
  componentDidMount() {
    // Get Individual User Information
    const id = localStorage.getItem("user_id");
    console.log("Edit User ID:", id);

    axios
      .get(`/users/${id}`)
      .then(res => {
        console.log("User To Edit:", res.data);
        this.setState({ user: res.data });
      })
      .catch(err => {
        console.log("Error getting user info:", err);
      });
  }

  // ======== Edit User Functionality

  // Update User Axios Call
  updateUser = user => {
    axios
      .put(`/users/${user.id}`, user)
      .then(res => {
        console.log("successfully updated user profile");
        window.location.reload();
      })
      .catch(error => {
        console.log("there was a problem editing your profile");
      });
  };

  // Input Change Handler
  handleChanges = e => {
    e.persist();
    const { id, value } = e.target;
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [id]: value
      }
    });
  };

  // Submit Form Button
  submitForm = e => {
    e.preventDefault();
    this.updateUser(this.state.user);
    this.setState({ isEditing: false });
  };

  render() {
    return (
      <>
        <form onSubmit={this.submitForm}>
          <p>First Name</p>
          <input
            id="first_name"
            type="text"
            value={this.state.user.first_name}
            onChange={this.handleChanges}
            placeholder="First Name"
          />
          <p>Last Name</p>
          <input
            id="last_name"
            type="text"
            value={this.state.user.last_name}
            onChange={this.handleChanges}
            placeholder="First Name"
          />
          <p>Short Bio</p>
          <input
            id="bio"
            type="text"
            value={this.state.user.bio}
            onChange={this.handleChanges}
            placeholder="Short Bio"
          />
          <p>Hourly Rate</p>
          <input
            id="hourly_rate"
            type="text"
            value={this.state.user.hourly_rate}
            onChange={this.handleChanges}
            placeholder="Hourly Rate"
          />

          <button>Save Edit</button>
        </form>
      </>
    );
  }
}

export default UserProfile;