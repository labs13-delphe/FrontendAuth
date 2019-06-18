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
              question={question}
              answers={props.answers}
              id={question.id}
              postAnswer={props.postAnswer}
              userInfo={props.userInfo}
            />
          );
        })}
      </h4>
    </>
  );
};

export default QuestionsList;
