import React from "react";

import QuestionsList from "./QuestionsList";
import axios from "axios";

class ExpertDashboard extends React.Component {
  state = {
    answers: [],
    userTopics: [],
    questions: []
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
  
  //Make API call to get an array of topics the user is expert in and set it to state.userTopics
  axios
  .get(`https://delphe-backend.herokuapp.com/api/topics/expertTopics/${localStorage.getItem(
    "user_id"
  )}`)
  .then(res => {
    console.log("expert return data", res);
    const user_topics = res.data.rows.map(topic=>topic.id)
    this.setState({
      userTopics: user_topics
    });

    //Make API call passing in array of expert's topics to retrieve questions in those topic areas"
    const getQsByTopics = {
      topicIds: user_topics
    }
    console.log(this.state.userTopics)
    console.log(getQsByTopics)
    axios
    .get(`http://localhost:5000/api/questions/questionTopics`, 
      {
      params: {
        ...getQsByTopics
      }
    })
    //
    .then(res => {
      console.log("expert return data", res);
      this.setState({
        questions: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });

  })
  .catch(err => {
    console.log(err);
  });
}

  // Edit Answer Axios Call
  editAnswer = answer => {
    axios
      .put(
        `https://delphe-backend.herokuapp.com/api/answers/${answer.id}`,
        answer
      )
      .then(res => {
        console.log("successfully edited");
        window.location.reload();
      })
      .catch(error => {
        console.log("there was a problem editing your answer");
      });
  };

  // Delete Answer Axios Call
  deleteAnswer = id => {
    axios
      .delete(`https://delphe-backend.herokuapp.com/api/answers/${id}`)
      .then(res => {
        console.log("successfully deleted");
        window.location.reload();
      })
      .catch(err => {
        console.log("there was a problem deleting your answer");
      });
  };

  render() {
    //const { answers } = this.state;
    console.log("expert dash", this.props);
    return (
      <div>
        <h2>Expert dash</h2>
        <QuestionsList
          questions={this.state.questions}
          // answers={this.state.answers}
          postAnswer={this.props.postAnswer}
          // QA={this.props.QA}
          editAnswer={this.editAnswer}
          deleteAnswer={this.deleteAnswer}
        />
      </div>
    );
  }
}

export default ExpertDashboard;
