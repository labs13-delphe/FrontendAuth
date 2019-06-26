// Packages
import React from "react";
import axios from "axios";

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

  // Cancel/Go Back To Previous Page Button
  goBack = e => {
    e.preventDefault();
    window.history.go(-1);
  };

  render() {
    const { classes } = this.props;
    return (
<div class="updateProfile-container container">
  <form onSubmit={this.submitForm}>
    <div class="row">
      <div class="col-25">
        
          <p>First Name</p>
          </div>
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

          {this.state.user.user_type === "expert" ? (
            <>
              <p>Hourly Rate</p>
              <input
                id="hourly_rate"
                type="text"
                value={this.state.user.hourly_rate}
                onChange={this.handleChanges}
                placeholder="Hourly Rate"
              />{" "}
            </>
          ) : null}
      
            <Button
              onClick={this.submitForm}
              variant="contained"
              color="primary"
              className={classes.button} 
              id="goBack-Button">
              Save Edit
              </Button>

                    
            <Button
              onClick={this.goBack}
              variant="contained"
              color="primary"
              className={classes.button} 
              id="goBack-Button">
              Cancel
              </Button>
              
         </div>   
      </form>
    </div>  
    );
  }
}

export default withStyles(styles)(UserProfile);