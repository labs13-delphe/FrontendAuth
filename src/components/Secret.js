// Packages
import React, { Component } from "react";
import axios from "axios";

// Components
import UserFormTwo from "./UserFormTwo.js";
import Dashboard from "./Dashboard.js";

// Rendering all protected components

class Secret extends Component {
  state = {
    questions: [],
    QA: []
  };

  // Getting all users info in order to compare the incoming information from auth object. -- NOT SETTING ANY STATE WITH THIS CALL -- CAN DELETE
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

  componentDidMount = () => {
    // AE - I don't think QA is being used anywhere
    axios
      .get(
        `https://delphe-backend.herokuapp.com/api/questions/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then(res => {
        this.setState({ QA: res.data });
        //console.log("Q & A data", res.data);
      })
      .catch(error => {
        console.log(error);
      });

    // THIS STATE QUESTIONS BEING PASSED TO EXPERTDASHBOARD
    axios
      .get("https://delphe-backend.herokuapp.com/api/questions")
      .then(res => {
        this.setState({ questions: res.data }, () => {
          console.log(this.state);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // REGISTRATION - POST USER INFORMATION  - SHOULD MOVE TO USERFORMTWO.JS
  postUserInfo = userInfo => {
    axios
      .post("https://delphe-backend.herokuapp.com/api/users", userInfo)
      .then(res => {
        console.log("successful registration!", res.data);
        localStorage.setItem("user_id", res.data.id);
        localStorage.setItem("user_type", userInfo.user_type);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log("secret props", this.props);
    console.log("secret state", this.state);

    return (
      <div>
        {/* added this to have a visual of the user data we can post to and compare to out unique id */}
        {/* {this.getUserInfo()} */}

        {localStorage.getItem("user_id") ? (
          <div>
            <Dashboard
              questions={this.state.questions}
              QA={this.state.QA} // AE - I don't think this is used
              gUser={this.props.gUser}
            />
          </div>
        ) : (
          <div>
            <UserFormTwo
              postUserInfo={this.postUserInfo}
              gUser={this.props.gUser}
            />
          </div>
        )}
      </div>
    );
  }
}
export default Secret;
