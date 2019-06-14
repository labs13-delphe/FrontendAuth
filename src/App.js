// Packages
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import NavBar from './components/NavBar'

// Components
import Secret from "./components/Secret.js";
import Dashboard from "./components/Dashboard.js";
import QuestionUpdateForm from "./components/AskerDashboard/QuestionUpdateForm.js";
import UserProfile from "./components/Users/UserProfile";
import Community from "./components/Community/Community";


//material ui
// import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';

import "./App.css";
firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN
});

class App extends Component {
  state = { isSignedIn: false, uniqueIdentifier: "" };

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
      this.setState({ isSignedIn: !!user, uniqueIdentifier: user.email });
      console.log("user", user);
    });
  };

  // UPDATE Question Function
  updateQuestion = question => {
    axios
      .put(`https://delphe-backend.herokuapp.com/api/questions/${question.id}`, question)
      .then(res => {
        console.log(res.data);
        // redirect to dashboard:
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        console.log("Can't update!", err);
      });
  };

  render() {
    console.log("app state", this.state);
    return (
      
      <div className="App">
      
        {this.state.isSignedIn ? (
          <div>
            <h1>Welcome to Delphe</h1>
            <button onClick={() => firebase.auth().signOut()}>Sign Out!</button>
            <Link to="/secret">
              <button>Go To Secret</button>{" "}
            </Link>
            <Link to="/community">
              <button>Community</button>{" "}
            </Link>

            <Route path="/secret" component={Secret} />

            <Route
              path="/dashboard"
              render={props => <Dashboard {...props} />}
            />
            <Route
              path="/questions/:id/update"
              render={props => (
                <QuestionUpdateForm
                  {...props}
                  updateQuestion={this.updateQuestion}
                />
              )}
            />
            <Route
              path="/users/:id"
              render={props => (
                <UserProfile
                  {...props}
                
                />
              )}
            />
            <Route
              path="/community"
              render={props => (
                <Community
                  {...props}
                
                />
              )}
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
