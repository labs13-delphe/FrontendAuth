// Packages
import React from "react";

// Components
import AskerSingleQuestion from "./AskerSingleQuestion.js";
import AskerEachQuestion from "./AskerEachQuestion.js";

const AskerQuestionsList = props => {
  return (
    <div>
      {props.questions.map(question => (
        <AskerEachQuestion
        question={question}
        users={props.users}
        deleteQuestion={props.deleteQuestion}
      />
        // <AskerSingleQuestion
        //   question={question}
        //   deleteQuestion={props.deleteQuestion}
        // />
      ))}
    </div>
  );
};

export default AskerQuestionsList;
