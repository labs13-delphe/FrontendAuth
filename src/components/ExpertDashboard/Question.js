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
      isEditing: false
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

  // Delete Answers Button
  deleteButton = event => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this answer?")) {
      this.props.deleteQuestion(this.state.answers.id);
    }
  };

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

  handleEdit = e => {
    e.preventDefault();
    this.setState({ isEditing: true });
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
                <button onClick={this.handleEdit}>Edit</button>"{answer.answer}"
                -{" "}
                <strong style={expertName}>
                  {this.state.users.map(user => {
                    if (user.id === answer.user_id) {
                      return (
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                      );
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

      <div class="form-group shadow-textarea">
        <h4>{this.props.question.question}</h4>
        <div class="accordion" id="myAccordion">

<div class="card">
<div class="card-header" id="item1Header">
     <h5 class="mb-0">
       <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#expandable1" aria-expanded="false" aria-controls="expandable1">
         Provide Answer
       </button>
     </h5>
   </div>
   <div id="expandable1" class="collapse" aria-labelledby="item1Header" data-parent="#myAccordion">
     <div class="card-body"></div>
        <form onSubmit={this.submitAnswer}>
          <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3"
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

      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default Question;
