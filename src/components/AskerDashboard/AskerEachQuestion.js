import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Temp Styles
const bordered = {
  border: "1px solid black",
  background: "#EEFBFC",
  margin: "15px"
};
const generalAlign = {
  "text-align": "left",
  "padding-left": "20px"
};

const answerStyle = {
  "text-align": "left",
  "padding-left": "50px"
};

const expertName = {
  color: "#058562"
};

class EachQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      topics: [],
      answers: [],
      answerCount: null,
      users: []
    };
  }

  componentDidMount() {
    const id = this.props.question.id;
    const endpoint = `https://delphe-backend.herokuapp.com/api/questions/${id}`;

    axios
      .get(endpoint)
      .then(res => {
        // console.log(res.data);
        this.setState({ question: res.data });
        this.setState({ topics: res.data.topics });
        this.setState({ answers: res.data.answers });
        this.setState({ answerCount: res.data.answers.length });
      })
      .catch(err => {
        console.log(err);
      });

    // GET ALL USERS
    const usersEndpoint = "https://delphe-backend.herokuapp.com/api/users/";
    axios
      .get(usersEndpoint)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log("Can't retrieve all users", err);
      });
  }

  // Delete Question Button
  deleteButton = event => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this question?")) {
      this.props.deleteQuestion(this.state.question.id);
    }
  };

  render() {
    // condition: Render Answers Div if question has answers (answerCount > 0)
    const answersDiv =
      this.state.answerCount > 0 ? (
        <div className="answers-div">
          <p style={generalAlign}>
            <strong>Answers: </strong>
          </p>
          {this.state.answers.map(answer => {
            return (
              <p style={answerStyle}>
                "{answer.answer}" -{" "}
                <strong style={expertName}>
                  {this.state.users.map(user => {
                    if (user.id === answer.user_id) {
                      return user.username;
                    }
                  })}
                </strong>
              </p>
            );
          })}
        </div>
      ) : (
        <p>No answers yet</p>
      );
    return (
      <div style={bordered}>
        <div className="question-div">
          <p style={generalAlign}>
            <Link to={`/questions/${this.state.question.id}/update`}>
              <i class="fas fa-pen" />
            </Link>
            <i onClick={this.deleteButton} class="fas fa-trash" />
            &nbsp;|&nbsp;
            <strong>{this.state.question.title}: </strong>
            {this.state.question.question} <br /> {this.state.answerCount}{" "}
            answers
          </p>
        </div>

        <div className="topics-div">
          <p style={generalAlign}>
            <strong>Topic: </strong>
            {this.state.topics.map(topic => (
              <span>{topic.topic}, </span>
            ))}
          </p>
        </div>
        {answersDiv}
      </div>
    );
  }
}

export default EachQuestion;