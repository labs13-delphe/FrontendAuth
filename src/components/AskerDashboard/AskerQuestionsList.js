// Packages
import React from "react";

// Components
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
      ))}
    </div>
  );
};

export default AskerQuestionsList;
