// ACTUALLY BEING RENDERED THROUGH APP JS, NOT ASKERDASHBOARD

// Packages
import React from "react";
import axios from "axios";
//**** took care of netlify bugs */
// import { Route, Link } from "react-router-dom";

class QuestionUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        user_id: "",
        question: "",
        title: "",
        id: null
      }

    };
  }

  componentDidMount() {
    this.singleQuestion();
  }
  singleQuestion = () => {
    const id = this.props.match.params.id;
    console.log("Question ID on Update:", id);
    const endpoint = `https://delphe-backend.herokuapp.com/api/questions/${id}`;
    axios
      .get(endpoint)
      .then(res => {
        this.setState({ question: {
          user_id: res.data.user_id,
          question: res.data.question,
          title: res.data.title,
          id: res.data.id
        } });
        console.log("Question on State:", this.state.question)
      })
      .catch(err => {
        console.log("Error getting question", err);
      });
  };

  handleChanges = e => {
    e.persist();
    const { id, value } = e.target;
    this.setState(prevState => ({
      question: {
        ...prevState.question,
        [id]: value
      }
    }));
  };

  submitForm = e => {
    e.preventDefault();
    // invoke updateQuestion from App.js
    this.props.updateQuestion(this.state.question);

  };

  cancelButton = e => {
    e.preventDefault();
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div>
        <h3>Update Your Question</h3>
        <form onSubmit={this.submitForm}>
          <input
            id="title"
            type="text"
            value={this.state.question.title}
            onChange={this.handleChanges}
            placeholder="Title"
          />
          <input
            id="question"
            type="text"
            value={this.state.question.question}
            onChange={this.handleChanges}
            placeholder="What's your question?"
          />
          <input type="submit" value="submit" />
        </form>
        <button onClick={this.cancelButton}>Cancel</button>
      </div>
    );
  }
}
export default QuestionUpdateForm;