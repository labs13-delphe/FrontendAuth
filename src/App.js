// Packages
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Components
import NavBar from "./components/NavBar.js";
import Secret from "./components/Secret.js";
import Dashboard from "./components/Dashboard.js";
import UserProfile from "./components/Users/UserProfile";
import Community from "./components/Community/Community";
import UserFormTwo from "./components/UserFormTwo.js";

import "./App.css";
firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN
});

class App extends Component {
  state = {
    isSignedIn: false,
    uniqueIdentifier: "",
    gUser: {},
    questions: [],
    QA: [] // AE - I don't think this is being used anywhere in the Expert dash
  };

  // FIRE BASE
  uiConfig = {
    signInFlow: "popup",
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
        //uniqueIdentifier: user.email,
        gUser: user
      });
      //this.props.history.push("/secret/dashboard");

      // GET QUESTION - PASSED TO EXPERT DASH
      axios
        .get("https://delphe-backend.herokuapp.com/api/questions")
        .then(res => {
          this.setState({ questions: res.data }, () => {
            console.log(this.state.questions);
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  // REGISTRATION AXIOS CALL - POST USER INFORMATION

  postUserInfo = userInfo => {
    axios
      .post("https://delphe-backend.herokuapp.com/api/users", userInfo)
      .then(res => {
        console.log("successful registration!", res.data);
        localStorage.setItem("user_id", res.data.id);
        localStorage.setItem("user_type", userInfo.user_type);
        //window.location.reload();
        this.props.history.push("/dashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };

  // LANDING PAGE BUTTONS
  getStarted = e => {
    e.preventDefault();
    // or use localStorage.getItem("firebaseui::rememberedAccounts")
    this.state.isSignedIn
      ? localStorage.getItem("user_id")
        ? this.props.history.push("/dashboard")
        : this.props.history.push("/profile-form")
      : this.props.history.push("/firebase");
  };

  render() {
    console.log("app state", this.state);

    return (
      <div className="App">
        <NavBar/>
        <div className="Fake-Landing-Page">
          <h1>This is the Fake Landing Page</h1>
          <button onClick={this.getStarted}>Get Started</button>
        </div>

        <Route
          path="/firebase"
          render={props => (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        />
        <Route
          path="/profile-form"
          render={props => (
            <UserFormTwo
              postUserInfo={this.postUserInfo}
              uniqueIdentifier={this.state.uniqueIdentifier}
            />
          )}
        />
        <Route
          path="/dashboard"
          render={props => (
            <Dashboard
              {...props}
              questions={this.state.questions}
              QA={this.state.QA}
              gUser={this.props.gUser}
            />
          )}
        />
        <Route
          path="/users/:id"
          render={props => <UserProfile {...props} gUser={this.state.gUser} />}
        />
        <Route path="/community" render={props => <Community {...props} />} />
        {/* {this.state.isSignedIn ? (
          <div>
            <NavBar />
            <Route
              path="/secret"
              render={props => (
                <Secret
                  uniqueIdentifier={this.state.uniqueIdentifier}
                  gUser={this.state.gUser}
                />
              )}
            />

            <Route
              path="/dashboard"
              render={props => (
                <Dashboard
                  {...props}
                  questions={this.state.questions}
                  QA={this.state.QA}
                  gUser={this.props.gUser}
                />
              )}
            />

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
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )} */}
      </div>
    );
  }
}

export default App;
