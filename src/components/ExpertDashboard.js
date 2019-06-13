import React from "react";

import QuestionsList from "./QuestionsList";
import axios from 'axios'

class ExpertDashboard extends React.Component {

  state = {
    answers: [],
    questions: []
  }


  componentDidMount() {

    const id = 5
    const user = {id: 5}
    const topic_id = 2

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

          axios.get(`http://localhost:5000/api/questions/topic/${topic_id}`)
          .then(res => {
            console.log(res)
            this.setState ({
              questions: res.data
            })
          })
          .catch(err => {
            console.log(err)
          })
  }

  render() {
    const { answers, questions } = this.state
    return (
      <div>
        <h2>Expert dash</h2>

        <h1>Your Answers</h1>
        {answers.map(({ answer, question }) =>
          <div>
          <h2>{question}</h2>
          {answer}
          </div>
          )}
        {/* <QuestionsList questions={props.questions} /> */}

        <h1>Unanswered Questions</h1>
        {questions.map(({ question }) =>
          <div>
          <h5>{question}</h5>
          </div>
          )}
      </div>
    );
  }

};

export default ExpertDashboard;
