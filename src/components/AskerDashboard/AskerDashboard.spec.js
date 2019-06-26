import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import AskerDashboard from "./AskerDashboard.js";

describe("<AskerDashboard/>", () => {
  it("should render Asker Dashboard without crashing", () => {
    render(<AskerDashboard />);
  });

  describe("Text on UI", () => {
    it("should see 'Your Feed' on UI", () => {
      const { getByText } = render(<AskerDashboard />);
      getByText("Your Feed");
    });
  });
});
