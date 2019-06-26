import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import QuestionForm from "./QuestionForm"

describe("<QuestionForm/>", () => {
    it("should render Question Form without crashing", () => {
      render(<QuestionForm />);
    });
  
    describe("Visuals on Question Form UI", () => {
      it("should see 'Ask a question' on UI", () => {
        const { getByText } = render(<QuestionForm />);
        getByText("Ask a question");
      });

      it("should see 'Submit' button on UI", () => {
        const { getByText } = render(<QuestionForm />);
        getByText(/submit/i);
      });
    });
  });
  