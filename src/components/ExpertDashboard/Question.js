import React from "react";

class Question extends React.Component {
  state = {
    question_id: this.props.id,
    user_id: localStorage.getItem("user_id"),
    answer: ""
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

  render() {
    console.log("question props", this.props);
    console.log("question state", this.state);
    return (
      <div>
        <h4>{this.props.question.question}</h4>
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
      </div>
    );
  }
}

export default Question;
