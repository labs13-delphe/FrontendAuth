import React from "react";
import firebase from "firebase";

import "./UserFormCss.css";

import {
  TextField,
  Button,
  withStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Paper
} from "@material-ui/core";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  buttons: {
    display: "flex",
    JustifyContent: "flex-end"
  },
  input: {
    display: "none"
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    [theme.breakpoints.down("md")]: {
      width: 300
    }
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  paper: {
    maxWidth: 680,
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  select: {
    width: 200
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  center: {
    margin: "0 auto"
  }
});

class UserForm extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
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
    let userInfo = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      username: this.state.username,
      password: this.props.uniqueIdentifier,
      bio: this.state.bio,
      user_type: this.state.user_type,
      image_url: this.state.image_url,
      hourly_rate: this.state.hourly_rate
    };
    this.props.postUserInfo(userInfo);
  };

  render() {
    const { classes } = this.props;
    console.log("user form props", this.props);
    console.log("user form state", this.state);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <div className={classes.spaceBetween}>
              <Typography variant="h6" noWrap>
                Welcome! Create your Profile!
              </Typography>

              <Button color="inherit" onClick={() => firebase.auth().signOut()}>
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <Paper className={classes.center}>
          <form onSubmit={this.submitUser} className="user-form">
            <TextField
              label="First Name"
              type="text"
              name="first_name"
              value={this.state.first_name}
              placeholder="First Name"
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Last Name"
              type="text"
              name="last_name"
              value={this.state.last_name}
              placeholder="Last Name"
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="Email"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Username"
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Bio"
              type="text"
              name="bio"
              value={this.state.bio}
              placeholder="bio"
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="user_type"
              type="text"
              name="user_type"
              value={this.state.user_type}
              placeholder="user_type"
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="image_url"
              type="text"
              name="image_url"
              value={this.state.image_url}
              placeholder="image_url"
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="hourly_rate"
              type="int"
              name="hourly_rate"
              value={this.state.hourly_rate}
              placeholder="hourly_rate"
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <Button onClick={this.submitUser}>Submit</Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UserForm);

///firstname, lastname, email, username, password

//bio, img url, user_type, hourly_rate
