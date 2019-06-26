// Packages
import React from "react";

// Components
import CommunityEachQuestion from "./CommunityEachQuestion";

// Quick Styles
const fullWidth = {
  width: "100%",
  display: "flex",
  "flexDirection": "column",
  "justifyContent": "center",
  "alignItems": "center"
};

const CommunityQuestionsList = props => {
  return (
    <div style={fullWidth}>
      {props.questions.map(question => (
        <CommunityEachQuestion question={question} key={question.id} />
      ))}
    </div>
  );
};

export default CommunityQuestionsList;
