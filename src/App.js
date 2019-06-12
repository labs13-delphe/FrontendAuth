// Packages
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Components
import Secret from "./components/Secret.js";
import Dashboard from "./components/Dashboard.js";

import "./App.css";
firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN
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
            <h1>Welcome to Delphe</h1>
            <button onClick={() => firebase.auth().signOut()}>Sign Out!</button>
            <Link to="/secret">
              <button>Go To Secret</button>{" "}
            </Link>

            <Route path="/secret" component={Secret} />

            <Route
              path="/dashboard"
              render={props => <Dashboard {...props} />}
            />
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
