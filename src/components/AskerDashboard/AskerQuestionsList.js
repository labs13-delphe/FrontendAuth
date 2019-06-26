// Packages
import React from "react";

// Components
import AskerEachQuestion from "./AskerEachQuestion.js";

// Quick Styles
const fullWidth = {
  width: "100%",
  display: "flex",
  "flexDirection": "column",
  "justifyContent": "center",
  "alignItems": "center"
};
const AskerQuestionsList = props => {
  return (
    <div style={fullWidth}>
      {props.questions.map(question => (
        <AskerEachQuestion
          key={question.id}
          question={question}
          users={props.users}
          deleteQuestion={props.deleteQuestion}
          updateQuestion={props.updateQuestion}
        />
      ))}
    </div>
  );
};

export default AskerQuestionsList;
