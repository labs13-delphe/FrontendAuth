// Packages
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import firebase from "firebase";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"; // now on Authorization.js

// Components
import NavBar from "./components/NavBar.js";
import Secret from "./components/Secret.js";
import Dashboard from "./components/Dashboard.js";
import UserProfile from "./components/Users/UserProfile";
import Community from "./components/Community/Community";
import Landing from './components/landing/Landing';
import Authorization from "./components/Authorization";


import "./App.css";

// NOW ON AUTHORIZATION.JS
// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_DOMAIN
// });

class App extends Component {
  state = { isSignedIn: false, uniqueIdentifier: "", gUser: {} }; // still need this here

  // NOW ON AUTHORIZATION.JS
  // uiConfig = {
  //   signInFlow: "popup",
  //   signInOptions: [
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //     firebase.auth.EmailAuthProvider.PROVIDER_ID
  //   ],
  //   callbacks: {
  //     signInSuccessWithAuthResult: () => false
  //   }
  // };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user,
        gUser: user
      });
    });
  };

  goToAuthorization = e => {
    e.preventDefault();
    this.props.history.push("/authorization")
  }

  render() {
    console.log("app state", this.state);

    return (
      <div className="App">
        <button onClick={this.goToAuthorization}>Go To Authorization</button>
       <Route exact path="/"component={Landing}/>
       <Route path="/authorization"component={Authorization}/>

        {this.state.isSignedIn ? (
          <div>
           
            <NavBar/>
            
            <Route
              path="/secret"
              render={props => (
                <Secret
                  uniqueIdentifier={this.state.uniqueIdentifier}
                  gUser={this.state.gUser}
                />
              )}
            />
            {/* 
            <Route
              path="/dashboard"
              render={props => <Dashboard {...props} />}
            /> */}

            <Route
              path="/users/:id"
              render={props => (
                <UserProfile {...props} gUser={this.state.gUser} />
              )}
            />
            <Route
              path="/community"
              render={props => <Community {...props} />}
            />
          </div>
        ) : (
          null
          // NOW ON AUTHORIZATION.JS
          // <StyledFirebaseAuth
          //   uiConfig={this.uiConfig}
          //   firebaseAuth={firebase.auth()}
          // />
        )}
      </div>
    );
  }
}

export default App;