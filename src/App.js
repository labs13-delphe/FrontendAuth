import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import "./App.css";

import Secret from "./components/Secret";

firebase.initializeApp({
  apiKey: "AIzaSyB1KeJbVPoyu2pqB712EKi6oKdF0dieX0c",
  authDomain: "delphe-f772c.firebaseapp.com"
});

class App extends Component {
  state = { isSignedIn: false };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <div>
            <h2>Signed In</h2>
            <Secret />

            <button onClick={() => firebase.auth().signOut()}>Sign Out!</button>
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default App;
