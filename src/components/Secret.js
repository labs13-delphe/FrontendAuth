// Packages
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";

//Material Components

// Components
import UserForm from "./UserForm.js";
import Dashboard from "./Dashboard.js";

//Material UI
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'
import { styled } from '@material-ui/styles';

//rendering all protected components and keeping state here

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
}

class Secret extends Component {

  state = {
    answers: [],
    questions: [],
    userInfo: [],
  }

  postUserInfo = userInfo => {
    axios
      .post("https://delphe-backend.herokuapp.com/api/users", userInfo)
      .then(res => {
        console.log({ message: "Success!!" });
      })
      .catch(error => {
        console.log(error);
      });
  };

  //getting all users info in order to compare the incoming information from auth object.
  getUserInfo = () => {
    axios
      .get("https://delphe-backend.herokuapp.com/api/users")
      .then(res => {
        console.log("users data", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //create a variable with the user email from the auth object

  //compare that variable to the same variable in user data table

  //

  componentDidMount = () => {

    //Get questions by user id
    const id = localStorage.getItem("user_id")
    axios
      .get(
        `https://delphe-backend.herokuapp.com/api/users/${id}/questions`
      )
      .then(res => {
        console.log("Askers data:", res.data);
        this.setState({ 
          userInfo: res.data ,
          questions: res.data.questions,
          answers: res.data.answers,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

    //API call for adding a question from QuestionForm.js
  addQuestion = question => {
    const questionObject = {
      ...question
    }

    const userId = localStorage.getItem("user_id")
    questionObject.user_id = userId

    axios
      .post('https://delphe-backend.herokuapp.com/api/questions', questionObject)
      .then(res => {
        console.log("Updated questions:", res.data);
        // this.setState({ questions: res.data });
      })
      .catch(err => {
        console.log("Can't retrieve all users", err);
      });
  }

    //Get Users
    // axios
    //   .get("https://delphe-backend.herokuapp.com/api/questions")
    //   .then(res => {
    //     this.setState({ questions: res.data }, () => {
    //       console.log(this.state);
    //     });
    //     // console.log(res.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });


  // BUTTONS TO DELETE ONCE LOGIN/REGISTER SETS USER_TYPE ON local storage
  // Sets user_ids and user_types for asker, expert, and clear items on storage
  viewAskerDashboard() {
    localStorage.setItem("user_id", 1);
    localStorage.setItem("user_type", "asker");
    window.location.reload();
  }

  viewExpertDashboard() {
    localStorage.setItem("user_id", 5);
    localStorage.setItem("user_type", "expert");
    window.location.reload();
  }

  clearStorage() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type");
    window.location.reload();
  }

  render() {
    console.log("secret props", this.props);
    console.log("secret state", this.state);

    return (
      <div>
        {/* added this to have a visual of the user data we can post to and compare to out unique id */}
        {/* {this.getUserInfo()} */}

        {/* Can use until when we get our registration/login totally functioning  */}
        {/* <button onClick={this.viewAskerDashboard}>
          {" "}
          Pretend an Asker is Signed In{" "}
        </button>
        <button onClick={this.viewExpertDashboard}>
          {" "}
          Pretend an Expert is Signed In{" "}
        </button> */}

        {//this.state.questions.length
        localStorage.getItem("user_id") ? (
          <div>
            <button onClick={this.clearStorage}>Erase User on Storage</button>
            <Dashboard data={this.state} addQuestion={this.addQuestion} />
          </div>
        ) : (
          <div>
            <h4>Please Register To Access Secret</h4>
            <UserForm postUserInfo={this.postUserInfo} />
          </div>
        )}
      </div>
    );
  }
}
export default Secret;
