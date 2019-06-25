// Packages
import React from "react";
import axios from "axios";
import firebase from "firebase";

import { withStyles} from "@material-ui/core/styles";

import {
  TextField,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Avatar
} from "@material-ui/core";

// Components
import SingleUser from "./SingleUser";
import UpdateProfile from "./UpdateProfile";

axios.defaults.baseURL =
  process.env.API_URL || "https://delphe-backend.herokuapp.com/api";

  const styles = theme => ({
    card: {
      width: "100%",
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1)
    },
    topicButton: {
      margin: theme.spacing(1),
      '&:hover': {
        cursor: 'default',
      }
    },
  
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },

    dialog: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      background: "orange"
    },
    textField: {
      width: "90%",
      margin: theme.spacing(1)
    },
    formButtons: {
      display: "flex",
      width: "100%",
      justifyContent: "space-evenly"
    },
    button: {
      margin: theme.spacing(1)
    }
  });

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
        firebase.auth().signOut();
        localStorage.clear();
        window.location = "/";
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

  render(props) {
    const { classes } = this.props;
    return (
      <>
        {this.state.isEditing === false ? (
          <div>
            <SingleUser user={this.state.user} />
            <div className="conditional-buttons">
              {this.state.user.id ===
              Number(localStorage.getItem("user_id")) ? (
                <div className="jumbotron conBtn">
                {/* button with material ui */}
                  <Button onClick={this.deleteButton} variant="contained"
                          color="primary"
                          className={classes.button}> Delete Account</Button>{" "}

                  <Button onClick={this.toggleEdit} variant="contained"
                          color="primary"
                          className={classes.button}>Edit Profile</Button>{" "}

                  <Button onClick={this.goBack} variant="contained"
                          color="primary"
                          className={classes.button}>Go Back</Button>
                </div>
              ) : (
                <div>
                  <button>Send Message</button>
                  <Button
                          onClick={this.goBack}
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          Go Back
                        </Button>
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

export default withStyles(styles)(UserProfile);
