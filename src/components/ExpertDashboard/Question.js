import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Temp Styles -- Delete When Styling For Real
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

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      topics: [],
      answers: [],
      answerCount: null,
      users: [],
      question_id: this.props.id,
      user_id: localStorage.getItem("user_id"),
      answer: "",
      isEditing: false,
      singleAnswer: {
        id: null,
        user_id: null,
        question_id: null,
        answer: ""
      }
    };
  }

  componentDidMount() {
    const id = this.props.question.id;
    const endpoint = `https://delphe-backend.herokuapp.com/api/questions/${id}`;

    // SETTING QUESTION INFORMATION
    axios
      .get(endpoint)
      .then(res => {
        // console.log(res.data);
        this.setState({
          question: res.data,
          topics: res.data.topics,
          answers: res.data.answers,
          answerCount: res.data.answers.length
        });
      })
      .catch(err => {
        console.log(err);
      });

    // GET ALL USERS (to get usernames)
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

  // ========= GET EXPERT ANSWERS
  getUsersAnswer = answer_id => {
    axios
      .get(`https://delphe-backend.herokuapp.com/api/answers/${answer_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          singleAnswer: {
            question_id: res.data.question_id,
            user_id: res.data.user_id,
            answer: res.data.answer,
            id: res.data.id
          }
        });
      })
      .catch(err => {
        console.log("couldn't get an answer based on that id");
      });
  };

  // ========= POST ANSWER
  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  submitAnswer = e => {
    e.preventDefault();
    let answer = {
      question_id: this.props.id,
      user_id: localStorage.getItem("user_id"),
      answer: this.state.answer
    };
    this.props.postAnswer(answer);
  };

  // ========= UPDATE ANSWER
  // Toggle isEditing
  handleEdit = (e, answer_id) => {
    e.preventDefault();
    this.setState({ isEditing: true });

    this.getUsersAnswer(answer_id);
  };

  handleEditChange = e => {
    this.setState({
      ...this.state,
      singleAnswer: {
        ...this.state.singleAnswer,
        [e.target.name]: e.target.value
      }
    });
  };

  submitEdit = e => {
    e.preventDefault();
    this.props.editAnswer(this.state.singleAnswer);
  };

  // ========= DELETE ANSWER
  deleteAnswer = (e, answer_id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this answer?")) {
      this.props.deleteAnswer(answer_id);
    }
  };

  render() {
    // console.log("question props", this.props);
    // console.log("question state", this.state);
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
                <button
                  onClick={e => {
                    this.handleEdit(e, answer.id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={e => {
                    this.deleteAnswer(e, answer.id);
                  }}
                >
                  Delete
                </button>
                "{answer.answer}" -{" "}
                <strong style={expertName}>
                  {this.state.users.map(user => {
                    if (user.id === answer.user_id) {
                      return (
                        <Link to={`/users/${user.id}`} key={user.id}>{user.username}</Link>
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
      const answersText = this.state.answerCount === 1 ? <span>answer</span> : <span>answers</span>;
    return (
      <div style={bordered}>
        <div className="question-div">
        
            {this.state.users.map(user => {
              if (user.id === this.state.question.user_id) {
                return (
                  <div className="user-info-div" style={generalAlign} key={user.id}>
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
            {/* <Link to={`/questions/${this.state.question.id}/update`}>
              <i className="fas fa-pen" />
            </Link>
            <i onClick={this.deleteButton} className="fas fa-trash" />
            &nbsp;|&nbsp; */}
            <strong>{this.state.question.title}: </strong>
            {this.state.question.question} <br /> {this.state.answerCount}{" "}
            {answersText}
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

        <div>
          {this.state.isEditing ? (
            <form onSubmit={this.submitEdit}>
              <input
                label="singleAnswer"
                type="text"
                name="answer"
                value={this.state.singleAnswer.answer}
                placeholder="answer"
                onChange={this.handleEditChange}
                className="answer-input"
              />
              <button onClick={this.submitEdit}>Save Edit</button>
            </form>
          ) : (
            <form onSubmit={this.submitAnswer}>
              <input
                label="answer"
                type="text"
                name="answer"
                value={this.state.answer}
                placeholder="answer"
                onChange={this.handleChange}
                className="answer-input"
              />
              <button onClick={this.submitAnswer}>Submit</button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Question;
