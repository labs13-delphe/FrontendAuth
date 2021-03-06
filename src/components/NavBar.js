// Packages
import React from "react";
import axios from "axios";
import firebase from "firebase";
import { NavLink } from "react-router-dom";

// Material UI
import {
  AppBar,
  CssBaseline,
  Button,
  Toolbar,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// Custom Styles
const styles = theme => ({
  toolBar: {
    display: "flex",
    justifyContent: "center"
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  dashboardText: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  Button: {
    marginLeft: theme.spacing(3),
    textTransform: "none", // So font is now sentence case
    color: "#D0D8FF",
    "&:hover": {
      color: "white",
      textDecoration: "underline",
      background: "none"
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(0)
    }
  },
  activeButton: {
    color: "white",
    textDecoration: "underline"
  },
  navButtons: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between"
    }
  },
  appBarSpacer: theme.mixins.toolbar
});

class NavBar extends React.Component {
  state = {
    user: {}
  };
  componentWillMount() {
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

  logout = e => {
    firebase.auth().signOut();
    localStorage.clear();
    window.location = "/";
  };

  render() {
    const { classes } = this.props,
      { user } = this.state;

    return (
      <div>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar className={classes.toolBar}>
            <div className={classes.spaceBetween}>
              <Typography variant="h5" noWrap className={classes.dashboardText}>
                Dashboard
              </Typography>
              <div className={classes.navButtons}>
                <NavLink
                  to="/secret/dashboard"
                  className={classes.Button}
                  activeClassName={classes.activeButton}
                >
                  Your Feed
                </NavLink>

                <NavLink
                  to="/community"
                  className={classes.Button}
                  activeClassName={classes.activeButton}
                >
                  Community Feed
                </NavLink>

                <NavLink
                  to={`/users/${user.id}`}
                  className={classes.Button}
                  activeClassName={classes.activeButton}
                >
                  Profile
                </NavLink>
                <Button
                  color="inherit"
                  onClick={this.logout}
                  className={classes.Button}
                >
                  Logout
                </Button>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.appBarSpacer} />
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
