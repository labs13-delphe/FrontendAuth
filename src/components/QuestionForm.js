import React from "react";
import axios from "axios";

class QuestionForm extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <h3>Ask A Question</h3>
        <form>
          <input placeholder="Question Title..." />
          <input placeholder="What's your question?" />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default QuestionForm;
