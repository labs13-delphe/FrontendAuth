// Packages
import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Materiall UI
import { withStyles, CssBaseline, Typography, Paper } from "@material-ui/core";

// NOTE: isSignedIn and gUser on App.js state is also being set through this file

const styles = theme => ({
  center: {
    display: "flex",
    flexDirection: "column",
    //alignItems: "center",
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

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN
});

class Authorization extends Component {
  state = {
    isSignedIn: false,
    uniqueIdentifier: "",
    gUser: {
      email: "null"
    }
  };

  uiConfig = {
    signInFlow: "popup",
    //signInSuccessUrl: '/secret',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user,
        gUser: user
      });
      console.log("AUTHO STATE:", this.state.gUser.email);
      this.props.history.push("/secret");
    });
  };

  render() {
    const { classes } = this.props;
    console.log("Authorization state", this.state);

    return (
      <div>
        <CssBaseline />
        <Paper className={classes.center}>
          <Typography variant="h4">Let's Create an Account</Typography>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <a href="/" className={classes.centerText}>
            Changed my mind. Take me back, please.
          </a>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Authorization);
