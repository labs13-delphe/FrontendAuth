// Packages
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
  textAlign: "left",
  paddingLeft: "20px"
};

const answerStyle = {
  textAlign: "left",
  paddingLeft: "50px"
};

const expertName = {
  color: "#058562"
};

class CommunityEachQuestion extends React.Component {
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
              <p style={answerStyle} key={answer.id}>
                "{answer.answer}" -{" "}
                <strong style={expertName}>
                  {this.state.users.map(user => {
                    if (user.id === answer.user_id) {
                      return (
                        <Link to={`/users/${user.id}`} key={user.id}>
                          {user.username}
                        </Link>
                      );
                    } else {
                      return null;
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

    const answerText =
      this.state.answerCount === 1 ? (
        <span> answer </span>
      ) : (
        <span> answers </span>
      );
    return (
      <div style={bordered}>
        <div className="question-div">
          {this.state.users.map(user => {
            if (user.id === this.state.question.user_id) {
              return (
                <div
                  className="user-info-div"
                  style={generalAlign}
                  key={user.id}
                >
                  <p>
                    {user.first_name} {user.last_name} @{user.username}
                    <Link to={`/users/${user.id}`}>View Profile</Link>
                  </p>
                </div>
              );
            } else {
              return null;
            }
          })}

          <p style={generalAlign}>
            <strong>{this.state.question.title}: </strong>
            {this.state.question.question} <br /> {this.state.answerCount}{" "}
            {answerText}
          </p>
        </div>

        <div className="topics-div">
          <p style={generalAlign}>
            <strong>Topic: </strong>
            {this.state.topics.map(topic => (
              <span key={topic.id}>{topic.topic}, </span>
            ))}
          </p>
        </div>
        {answersDiv}
      </div>
    );
  }
}

export default CommunityEachQuestion;
