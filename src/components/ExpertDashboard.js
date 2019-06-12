import React from "react";

import QuestionsList from "./QuestionsList";
import axios from 'axios'

class ExpertDashboard extends React.Component {

  state = {
    answers: []
  }


  componentDidMount() {

    const id = 5
    const user = {id: 5}

    axios.get(`http://localhost:5000/api/answers/${id}`, user)
          .then(res => {
            console.log(res)
            this.setState ({
              answers: res.data
            })
          })
          .catch(err => {
            console.log(err)
          })
  }

  render() {
    const { answers } = this.state
    return (
      <div>
        <h2>Expert dash</h2>
        {answers.map(({ answer, question }) =>
          <div>
          <h2>{question}</h2>
          {answer}
          </div>
          )}
        {/* <QuestionsList questions={props.questions} /> */}
      </div>
    );
  }

};

export default ExpertDashboard;
