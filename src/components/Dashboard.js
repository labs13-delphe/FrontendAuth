import React from "react";
import axios from "axios";

// Components
import AskerDashboard from "./AskerDashboard/AskerDashboard";
import ExpertDashboard from "./ExpertDashboard/ExpertDashboard";

const Dashboard = props => {

  // Post Answer Method for Expert Dashboard
  const postAnswer = answer => {
    axios
      .post("https://delphe-backend.herokuapp.com/api/answers", answer)
      .then(res => {
        console.log("success");
      })
      .catch(error => {
        console.log("There was a problem posting your answer");
      });
  };

  // Conditionally Render AskerDashboard or ExpertDashboard Based on Local Storage Item
  const Component = localStorage.getItem("user_type") ? (
    localStorage.getItem("user_type") === "asker" ? (
      <AskerDashboard />
    ) : (
      <ExpertDashboard
        // questions={props.questions}
        postAnswer={postAnswer}
        QA={props.QA}
      />
    )
  ) : (
    <h2>Whoops. No User ID on Local Storage.</h2>
  );

  return <div> {Component}</div>;
};

export default Dashboard;
