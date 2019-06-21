import React from "react";

import Question from "./Question";

const QuestionsList = props => {
  console.log(props);
  return (
    <>
      <h4>
        {props.questions.map(question => {
          return (
            <Question
              key={question.id}
              // question={question}
              id={question.question_id}
              postAnswer={props.postAnswer}
              QA={props.QA}
              editAnswer={props.editAnswer}
              deleteAnswer={props.deleteAnswer}
              gUser={props.gUser}
            />
          );
        })}
      </h4>
    </>
  );
};

export default QuestionsList;
