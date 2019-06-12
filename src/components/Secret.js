import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import UserForm from "./UserForm.js";
import Dashboard from "./Dashboard.js";
import ExpertDashboard from "./ExpertDashboard";
import AskerDashboard from "./AskerDashboard/AskerDashboard";

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
        {/* Can use until when we get our registration/login totally functioning  */}
        <button onClick={this.viewAskerDashboard}>
          {" "}
          Pretend an Asker is Signed In{" "}
        </button>
        <button onClick={this.viewExpertDashboard}>
          {" "}
          Pretend an Expert is Signed In{" "}
        </button>

        {//this.state.questions.length
        localStorage.getItem("user_id") ? (
          <div>
            <button onClick={this.clearStorage}>Erase User on Storage</button>
            <Dashboard />
          </div>
        ) : (
          <div>
            <h4>Please Register To Access Secret</h4>
            <UserForm postUserInfo={this.props.postUserInfo} />
          </div>
        )}
      </div>
    );
  }
}
export default Secret;
