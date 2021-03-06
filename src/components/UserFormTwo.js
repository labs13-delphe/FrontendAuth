import React from "react";
import firebase from "firebase";
import axios from "axios";

import "./UserFormCss.css";

import {
  TextField,
  Button,
  withStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  InputLabel,
  FormControl,
  OutlinedInput,
  Select,
  MenuItem
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
    width: "100%"
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  center: {
    margin: "0 auto"
  },
  appBarSpacer: theme.mixins.toolbar,

  loadingText: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing(3)
  },
  centerText: {
    textAlign: "center"
  }
});

class UserForm extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    email: this.props.gUser.email,
    username: "",
    password: "",
    bio: "",
    user_type: "",
    image_url: this.props.gUser.photoURL,
    hourly_rate: 0, // keep - 0 is set as default (so asker doesn't have to fill it out)
    loggingInUser: true
  };
  componentDidMount() {
    console.log("G User:", this.props.gUser);
    this.setState({
      email: this.props.gUser.email,
      image_url: this.props.gUser.photoURL
    });

    axios
      .post("https://delphe-backend.herokuapp.com/api/auth/login", this.state)
      .then(res => {
        console.log("login success!!!", res.data);
        localStorage.setItem("user_type", res.data.user.user_type);
        localStorage.setItem("user_id", res.data.user.id);
        window.location = "/secret/dashboard";
      })
      .catch(err => {
        this.setState({ loggingInUser: false });
        console.log("FORM 2 STATE:", this.state);
        console.log("WAIT! Looks like you have to fill out a user profile");
      });
  }

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
      password: this.state.password, // AE - was this.props.uniqueIdentifier
      bio: this.state.bio,
      user_type: this.state.user_type,
      image_url: this.state.image_url,
      hourly_rate: this.state.hourly_rate
    };
    this.props.postUserInfo(userInfo);
  };

  cancelForm = e => {
    firebase.auth().signOut();
    localStorage.clear();
    window.location = "/";
  };

  render() {
    const { classes } = this.props;
    const userTypes = ["asker", "expert"];
    console.log("user form props", this.props);
    console.log("user form state", this.state);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <div className={classes.spaceBetween}>
              <Typography variant="h6" noWrap>
                Welcome!
              </Typography>

              <Button color="inherit" onClick={() => firebase.auth().signOut()}>
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.appBarSpacer} />

        <Paper className={classes.center}>
          {this.state.loggingInUser === true ? (
            <Typography variant="h4" className={classes.loadingText}>
              Logging you in...
            </Typography>
          ) : (
            <>
              {" "}
              <Typography variant="h4">Complete Your Profile</Typography>
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
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-age-simple">
                    User Type
                  </InputLabel>
                  <Select
                    value={this.state.user_type}
                    onChange={this.handleChange}
                    className={classes.textField}
                    inputProps={{
                      name: "user_type"
                    }}
                    input={
                      <OutlinedInput
                        name="user_type"
                        id="outlined-age-simple"
                      />
                    }
                  >
                    {userTypes.map(type => (
                      <MenuItem value={type} key={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {this.state.user_type === "expert" ? (
                  <TextField
                    label="Hourly Rate"
                    type="int"
                    name="hourly_rate"
                    value={this.state.hourly_rate}
                    placeholder="Hourly Rate"
                    onChange={this.handleChange}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                  />
                ) 
                : null}
                <Button onClick={this.submitUser}>Submit</Button>
                <Button onClick={this.cancelForm}>Cancel</Button>
              </form>
            </>
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UserForm);
