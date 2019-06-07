import React from "react";

import Question from "./Question";

const QuestionsList = props => {
  console.log(props);
  return (
    <>
      <h2>Questions List</h2>

      <h4>
        {props.questions.map(question => {
          return <Question question={question} />;
        })}
      </h4>
    </>
  );
};

export default QuestionsList;
