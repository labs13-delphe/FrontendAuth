import React from "react";

import QuestionsList from "./QuestionsList";
import axios from "axios";

class ExpertDashboard extends React.Component {
  state = {
    answers: []
  };

  componentDidMount() {
    axios
      .get(`https://delphe-backend.herokuapp.com/api/answers`)
      .then(res => {
        console.log("expert return data", res);
        this.setState({
          answers: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    //const { answers } = this.state;
    console.log("expert dash", this.props);
    return (
      <div>
        <h2>Expert dash</h2>
        {/* {answers.map(({ answer, question }) => (
          <div>
            <h2>{question}</h2>
            {answer}
          </div>
        ))} */}
        <QuestionsList
          questions={this.props.questions}
          answers={this.state.answers}
          postAnswer={this.props.postAnswer}
        />
      </div>
    );
  }
}

export default ExpertDashboard;
