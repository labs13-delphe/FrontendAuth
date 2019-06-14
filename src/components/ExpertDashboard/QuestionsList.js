import React from "react";

import Question from "./Question";

const QuestionsList = props => {
  console.log(props);
  return (
    <>
      <h2>Questions List</h2>

      <h4>
        {props.questions.map(question => {
          return (
            <Question
              question={question}
              answers={props.answers}
              id={question.id}
              postAnswer={props.postAnswer}
              QA={props.QA}
              editAnswer={props.editAnswer}
            />
          );
        })}
      </h4>
    </>
  );
};

export default QuestionsList;
