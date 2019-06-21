// Packages
import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// NOTE: isSignedIn and gUser on App.js state is also being set through this file

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
    console.log("Authorization state", this.state);

    return (
      <div>
        <h1>Please register</h1>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
      </div>
    );
  }
}

export default Authorization;
