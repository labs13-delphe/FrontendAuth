// Packages
import React from "react";
import axios from "axios";
import firebase from "firebase";
import { Link } from "react-router-dom";

// Material UI
import {
  AppBar,
  CssBaseline,
  Button,
  Toolbar,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

// Custom Styles
const styles = theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,

  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  }
});

class NavBar extends React.Component {
  state = {
    user: {}
  };
  componentDidMount() {
    const id = localStorage.getItem("user_id");
    const endpoint = `https://delphe-backend.herokuapp.com/api/users/${id}`;

    axios
      .get(endpoint)
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => {
        console.log("Can't retrieve user info", err);
      });
  }

  render() {
    const { classes } = this.props,
    { user } = this.state;

    return (
      <div>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.spaceBetween}>
              <Typography variant="h6" noWrap>
                {user.username}'s Dashboard NavBar
              </Typography>
              <Button color="inherit" href="/secret/dashboard">Your Questions</Button>
                <Button color="inherit" href="/community">
                  Community
                </Button>
                <Button color="inherit" href={`/users/${user.id}`}>
                  Profile
                </Button>
              

              <Button color="inherit" onClick={() => firebase.auth().signOut()}>
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
