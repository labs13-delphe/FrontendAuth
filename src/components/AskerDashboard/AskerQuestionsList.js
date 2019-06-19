// Packages
import React from "react";

// Components
import AskerEachQuestion from "./AskerEachQuestion.js";

const AskerQuestionsList = props => {
  return (
    <div>
      {props.questions.map(question => (
        <AskerEachQuestion
          key={question.id}
          question={question}
          users={props.users}
          deleteQuestion={props.deleteQuestion}
          updateQuestion ={props.updateQuestion}
        />
      ))}
    </div>
  );
};

export default AskerQuestionsList;
