import React from "react";

import Question from "./Question";

const fullWidth = {
  width: "100%",
  display: "flex",
  "flex-direction": "column",
  "justify-content": "center",
  "align-items": "center"
};

const QuestionsList = props => {
  console.log(props);
  return (
    <div style={fullWidth}>
      {props.questions.map(question => {
        return (
          <Question
            key={question.id}
            // question={question}
            id={question.question_id}
            //postAnswer={props.postAnswer}
            QA={props.QA}
            editAnswer={props.editAnswer}
            //deleteAnswer={props.deleteAnswer}
            gUser={props.gUser}
          />
        );
      })}
    </div>
  );
};

export default QuestionsList;
