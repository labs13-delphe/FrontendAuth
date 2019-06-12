import React from "react";
import { Link } from "react-router-dom";

// Font Awesome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEdit,
//   faPen,
//   faMinusCircle,
//   faTrash
// } from "@fortawesome/free-solid-svg-icons";

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
        <strong>{props.question.title}: </strong>
        {props.question.question}
        <Link to={`/questions/${props.question.id}/update`}>
        Edit
      </Link> 
        
        {/* <FontAwesomeIcon icon={faTrash}  /> */}
        <button onClick={deleteButton}>Delete</button>
      </p>

    </div>
  );
};

export default AskerSingleQuestion;
