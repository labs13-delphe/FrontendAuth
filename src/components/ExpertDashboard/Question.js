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
