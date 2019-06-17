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

  // // Delete Answers Button
  // deleteButton = event => {
  //   event.preventDefault();
  //   if (window.confirm("Are you sure you want to delete this answer?")) {
  //     this.props.deleteQuestion(this.state.answers.id);
  //   }
  // };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
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

  submitAnswer = e => {
    e.preventDefault();
    let answer = {
      question_id: this.props.id,
      user_id: localStorage.getItem("user_id"),
      answer: this.state.answer
    };
    this.props.postAnswer(answer);
  };

  submitEdit = e => {
    e.preventDefault();
    let answer = {
      question_id: this.state.singleAnswer.question_id,
      user_id: localStorage.getItem("user_id"),
      answer: this.state.singleAnswer.answer,
      id: this.state.singleAnswer.id
    };
    this.props.editAnswer(this.state.singleAnswer);
  };

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

  handleEdit = (e, answer_id) => {
    e.preventDefault();
    this.setState({ isEditing: true });

    this.getUsersAnswer(answer_id);
  };

  render() {
    console.log("question props", this.props);
    console.log("question state", this.state);
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
                <button
                  onClick={e => {
                    this.handleEdit(e, answer.id);
                  }}
                >
                  Edit
                </button>
                "{answer.answer}" -{" "}
                <strong style={expertName}>
                  {this.state.users.map(user => {
                    if (user.id === answer.user_id) {
                      return (
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                      );
                    } else {

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
              <button onClick={this.submitEdit}>Edit</button>
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

// {
//   /* <div class="form-group shadow-textarea">
// <h4>{this.props.question.question}</h4>
// <div class="accordion" id="myAccordion">

// <div class="card">
// <div class="card-header" id="item1Header">
// <h5 class="mb-0">
// <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#expandable1" aria-expanded="false" aria-controls="expandable1">
//  Provide Answer
// </button>
// </h5>
// </div>
// <div id="expandable1" class="collapse" aria-labelledby="item1Header" data-parent="#myAccordion">
// <div class="card-body"></div>
// <form onSubmit={this.submitAnswer}>
//   <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3"
//     label="answer"
//     type="text"
//     name="answer"
//     value={this.state.answer}
//     placeholder="answer"
//     onChange={this.handleChange}
//     className="answer-input"
//   />
//   <button onClick={this.submitAnswer}>Submit</button>
// </form> */
// }
