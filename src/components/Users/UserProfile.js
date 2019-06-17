// Packages
import React from "react";
import axios from "axios";

// Components
import SingleUser from "./SingleUser";
import UpdateProfile from "./UpdateProfile";

axios.defaults.baseURL =
  process.env.API_URL || "https://delphe-backend.herokuapp.com/api";

class UserProfile extends React.Component {
  state = {
    user: {},
    isEditing: false
  };

  // ======== Get User Information
  componentDidMount() {
    // Get Individual User Information
    const id = this.props.match.params.id;
    console.log("Single ID:", id);

    axios
      .get(`/users/${id}`)
      .then(res => {
        console.log("Single User:", res.data);
        this.setState({ user: res.data });
      })
      .catch(err => {
        console.log("Error getting user info:", err);
      });
  }

  // ======== Delete User

  // Delete User Axios Call
  deleteUser = id => {
    axios
      .delete(`/users/${id}`)
      .then(res => {
        console.log(res.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Delete User Button Click
  deleteButton = event => {
    const id = this.props.match.params.id;
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete your account?")) {
      this.deleteUser(id);
    }
  };

  // ======== Update User

  // Toggle Edit Button
  toggleEdit = e => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  // Go Back To Previous Page Button
  goBack = e => {
    e.preventDefault();
    window.history.go(-1);
  };

  render() {
    return (
      <>
        {this.state.isEditing === false ? (
          <div>
            <SingleUser user={this.state.user} />
            <div className="conditional-buttons">
              {this.state.user.id ===
              Number(localStorage.getItem("user_id")) ? (
                <div>
                  <button onClick={this.deleteButton}> Delete Account</button>{" "}
                  <button onClick={this.toggleEdit}>Edit Profile</button>
                  <button onClick={this.goBack}>Go Back</button>
                </div>
              ) : (
                <div>
                  <button>Send Message</button>
                  <button onClick={this.goBack}>Go Back</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <UpdateProfile />
        )}
      </>
    );
  }
}

export default UserProfile;
