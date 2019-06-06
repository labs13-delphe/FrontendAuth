import React from "react";

import QuestionsList from "./QuestionsList";

const ExpertDashboard = props => {
  return (
    <div>
      <h2>Expert dash</h2>
      <QuestionsList questions={props.questions} />
    </div>
  );
};

export default ExpertDashboard;
