// Packages
import React, { Component } from "react";
import axios from "axios";

// Components
import UserFormTwo from "./UserFormTwo.js";
import Dashboard from "./Dashboard.js";


//rendering all protected components and keeping state here

class Secret extends Component {
  state = {
    questions: [],
    QA: []
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


  componentDidMount = () => {
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


// REGISTRATION AXIOS CALL - POST USER INFORMATION 

  postUserInfo = userInfo => {
    axios
      .post("https://delphe-backend.herokuapp.com/api/users", userInfo)
      .then(res => {
        console.log("successful registration!", res.data)
        localStorage.setItem("user_id", res.data.id)
        localStorage.setItem("user_type", userInfo.user_type)
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

        {
        localStorage.getItem("user_id") ? (
          <div>
            {/* <button onClick={this.clearStorage}>Erase User on Storage</button> */}
            <Dashboard
              questions={this.state.questions}
              QA={this.state.QA}
              gUser={this.props.gUser}
            />
          </div>
        ) : (
          <div>
            <UserFormTwo
              postUserInfo={this.postUserInfo}
              uniqueIdentifier={this.props.uniqueIdentifier}
            />
          </div>
        )}
      </div>
    );
  }
}
export default Secret;
