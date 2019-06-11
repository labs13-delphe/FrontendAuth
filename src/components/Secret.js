import React, { Component } from "react";
import axios from "axios";
import UserForm from "./UserForm.js";
import ExpertDashboard from "./ExpertDashboard";
import AskerDashboard from "./AskerDashboard";

//rendering all protected components and keeping state here

class Secret extends Component {
  state = {
    questions: []
  };

  postUserInfo = () => {
    axios
      .post("https://delphe-backend.herokuapp.com/api/users")
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    axios
      .get("https://delphe-backend.herokuapp.com/api/questions")
      .then(res => {
        this.setState({ questions: res.data }, () => {
          console.log(this.state);
        });
        // console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Set user_id and user_type for user 1 on localstorage
  viewAskerDashboard() {
    localStorage.setItem("user_id", 1);
    localStorage.setItem("user_type", "asker");
    window.location.reload();
  }

  render() {
    console.log("secret props", this.props);
    console.log("secret state", this.state);

    return (
      <div>
        You hold the token
        <br />
        THIS WOULD BE THE USER DASHBOARD
        <br />
        Jump back to <a href="/">Main Page</a>
        <br />
        <button onClick={this.viewAskerDashboard}>
          <a href="/dashboard/asker">View Asker Dashboard</a>
        </button>
        <br />
        {this.state.questions.length ? (
          <ExpertDashboard questions={this.state.questions} />
        ) : (
          <h4>nope.</h4>
        )}
        <UserForm postUserInfo={this.props.postUserInfo} />
      </div>
    );
  }
}
export default Secret;
