// Packages
import React from "react";
import axios from "axios";
import { Route, Link, withRouter } from "react-router-dom";

// Components
import QuestionForm from "./QuestionForm";
import AskerQuestionsList from "./AskerQuestionsList";
import AskerAnswersList from "./AskerAnswersList";

class AskerDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      questions: [],
      answers: [],
      questionCount: "",
      answerCount: "",
      users: []
    };
  }

  componentDidMount() {
    // GET User's Questions data
    const id = localStorage.getItem("user_id");
    const endpoint = `https://delphe-backend.herokuapp.com/api/users/${id}/questions`;
    axios
      .get(endpoint)
      .then(res => {
        console.log("Askers data:", res.data);
        this.setState({ userInfo: res.data });
        this.setState({ questions: res.data.questions });
        this.setState({ answers: res.data.answers });
        this.setState({ questionCount: res.data.questions.length });
        this.setState({ answerCount: res.data.answers.length });
      })
      .catch(err => {
        console.log("Can't retrieve asker info", err);
      });

    // GET Users (askers + experts) data
    const allUsers = "https://delphe-backend.herokuapp.com/api/users/";
    axios
      .get(allUsers)
      .then(res => {
        console.log("All Users:", res.data);
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log("Can't retrieve all users", err);
      });
  }

  // DELETE Question
  deleteQuestion = id => {
    axios
      .delete(`https://delphe-backend.herokuapp.com/api/questions/${id}`)
      .then(res => {
        console.log(res.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // PUT Question function on App.js (Update form is also imported/rendered on App.js)

  render() {
    return (
      <>
        <h2>AskerDashboard</h2>
        <QuestionForm />
        <p>
          {this.state.questionCount} Questions Asked &nbsp;|&nbsp;{" "}
          {this.state.answerCount} Answers Received
        </p>
        <section>
          <h3>Your Questions</h3>
          <AskerQuestionsList
            questions={this.state.questions}
            deleteQuestion={this.deleteQuestion}
          />
        </section>
      </>
    );
  }
}

export default AskerDashboard;
