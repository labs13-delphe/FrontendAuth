import React from "react";
import { Link } from "react-router-dom";

// Components
import AskerDashboard from "./AskerDashboard/AskerDashboard";
import ExpertDashboard from "./ExpertDashboard";

function Dashboard(props) {
    
  const Component = localStorage.getItem("user_type") ? (
    localStorage.getItem("user_type") === "asker" ? (
      <AskerDashboard />
    ) : (
      <ExpertDashboard />
    )
  ) : (
    <h2>Whoops. No User ID on Local Storage.</h2>
  );



  return (
    <div>
      {" "}
      {Component}
    </div>
  );
}

export default Dashboard;
