// Packages
import React from "react";

// Components
import AskerSingleQuestion from "./AskerSingleQuestion.js";

const AskerQuestionsList = props => {
  return (
    <div>
      {props.questions.map(question => (
        <AskerSingleQuestion
          question={question}
          deleteQuestion={props.deleteQuestion}
        />
      ))}
    </div>
  );
};

export default AskerQuestionsList;
