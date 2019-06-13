// Packages
import React from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";

// Components
import CommunityEachQuestion from "./CommunityEachQuestion";

const CommunityQuestionsList = props => {
  return (
    <div>
      {props.questions.map(question => (
<CommunityEachQuestion question={question}/>
      ))}
    </div>
  );
};

export default CommunityQuestionsList;
