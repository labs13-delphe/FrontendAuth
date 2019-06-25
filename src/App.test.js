import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
const AppWithRouter = withRouter(App);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <AppWithRouter />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
