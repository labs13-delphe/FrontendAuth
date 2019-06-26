// Packages
import React from "react";
import axios from "axios";

// Components
import AskerDashboard from "./AskerDashboard/AskerDashboard";
import ExpertDashboard from "./ExpertDashboard/ExpertDashboard";

const Dashboard = props => {
  //Post Answer Method for Expert Dashboard -- should move to ExpertDashboard.js
  // const postAnswer = answer => {
  //   axios
  //     .post("https://delphe-backend.herokuapp.com/api/answers", answer)
  //     .then(res => {
  //       console.log("success");
  //     })
  //     .catch(error => {
  //       console.log("There was a problem posting your answer");
  //     });
  // };

  // Conditionally Render AskerDashboard or ExpertDashboard Based on Local Storage Item
  const Component = localStorage.getItem("user_type") ? (
    localStorage.getItem("user_type") === "asker" ? (
      <AskerDashboard gUser={props.gUser} />
    ) : (
      <ExpertDashboard
        questions={props.questions}
        //postAnswer={postAnswer}
        QA={props.QA}
        gUser={props.gUser}
      />
    )
  ) : (
    <h2>Please register to view this page.</h2>
  );

  return <div> {Component}</div>;
};

export default Dashboard;
