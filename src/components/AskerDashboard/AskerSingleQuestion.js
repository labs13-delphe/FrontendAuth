import React from "react";
import { Link } from "react-router-dom";

const questionStyle = {
  "text-align": "left",
  "padding-left": "20px",
  color: "#021636"
};

const AskerSingleQuestion = props => {
  // Delete Question Button
  const deleteButton = event => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this question?")) {
      props.deleteQuestion(props.question.id);
    }
  };

  // Edit Question Button
  const selectUpdateQuestion = event => {
    event.preventDefault();
    props.history.push(`/questions/${props.question.id}/update`);
  };

  return (
    <div key={props.question.id}>
      <p style={questionStyle}>
        <Link to={`/questions/${props.question.id}/update`}>
          <i class="fas fa-pen" />
        </Link>
        <i onClick={deleteButton} class="fas fa-trash" />
        <strong>{props.question.title}: </strong>
        {props.question.question}
      </p>
    </div>
  );
};

export default AskerSingleQuestion;
