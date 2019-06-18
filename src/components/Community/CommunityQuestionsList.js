// Packages
import React from "react";

// Components
import CommunityEachQuestion from "./CommunityEachQuestion";

const CommunityQuestionsList = props => {
  return (
    <div>
      {props.questions.map(question => (
        <CommunityEachQuestion question={question} key={question.id} />
      ))}
    </div>
  );
};

export default CommunityQuestionsList;
