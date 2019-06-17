import React from "react";
import axios from "axios";

import SingleUser from "./SingleUser";

axios.defaults.baseURL =
  process.env.API_URL || "https://delphe-backend.herokuapp.com/api";

class UserProfile extends React.Component {
  state = {
    user: {}
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

  // ======== Edit User Functionality -- NEEDS TO BE WORKED OUT

  // Update User Axios Call
  updateUser = updatedUser => {
    console.log("HEY this is UPDATEUSER", updatedUser);
    const user_id = localStorage.getItem("user_id");
    axios
      .get(`/users/${user_id}`)
      .then(res => {
        console.log("HEY RES", res);
        this.setState({
          user: res.data
            .find
            // user => `${user.user_id}` === localStorage.getItem("user_id")
            ()
        });
        console.log("UPDATE successful!");

        // redirect
        this.props.history.push(`/users/${user_id}`);
      })
      .catch(err => {
        // this.getUser()
        console.log("UPDATE NOT WORKING", err);
      });
  };

  // Update User Input Field Change Handler
  handleChange = e => {
    e.preventDefault();
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  };

  // Update User Submit Form
  onSubmitEditedUser = e => {
    e.preventDefault();
    this.updateUser(this.state.user);
    alert("YOU DID IT!!!!");
    this.setState({
      state: ""
    });
  };

  // Go Back To Previous Page Button
  goBack = e => {
    e.preventDefault();
    window.history.go(-1);
  };

  render() {
    return (
      <>
        <SingleUser user={this.state.user} />
        <div onClick={this.deleteUsers} className="">
          {this.state.user.id === Number(localStorage.getItem("user_id")) ? (
            <div>
              <button onClick={this.deleteButton}> Delete Account</button>{" "}
              <button>Edit Account</button>
              <button onClick={this.goBack}>Go Back</button>
            </div>
          ) : (
            <div>
              <button>Send Message</button>
              <button onClick={this.goBack}>Go Back</button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default UserProfile;
