////// =========== CHANGE LOCAL ENDPOINTS TO HEROKU LINKS

import React from "react";
import axios from "axios";

class QuestionForm extends React.Component {
  state = {
    user_id: localStorage.getItem("user_id"),
    title: "",
    question: "",
    topic: ""
  };

  handleChanges = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  submitForm = e => {
    e.preventDefault();
    const questionURL = "http://localhost:5000/api/questions";
    const topicURL = "http://localhost:5000/api/topics";
    const qtURL = "http://localhost:5000/api/topics/question";

    const questionBody = {
      user_id: this.state.user_id,
      title: this.state.title,
      question: this.state.question
    };
    axios
      .post(questionURL, questionBody) // posting question to questions table
      .then(res => {
        console.log("Question Res:", res.data);
        const q_id = res.data.id;
        alert("Your question has been submitted!");
        axios
          .post(topicURL, this.state) // finding topic in topics table
          .then(res => {
            console.log("Topic Res:", res.data);
            const t_id = res.data.id;
            const questionTopicIds = {
              question_id: q_id,
              topic_id: t_id
            };
            axios
              .post(qtURL, questionTopicIds) // posting question_id and topic_id to question_topics table
              .then(res => {
                console.log("QT Res:", res.data);
                console.log(q_id, t_id, res.data.id);
              })
              .catch(err => {
                console.log("Post QuestionTopic Error", err);
              });
          })
          .catch(err => {
            console.log("Post Topic Error", err);
          });    
      })
      .catch(err => {
        console.log("Post Question Error", err);
      });
  };

  render() {
    return (
      <div>
        <h3>Ask A Question</h3>
        <form onSubmit={this.submitForm}>
          <input
            id="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChanges}
            placeholder="Title"
          />
          <input
            id="question"
            type="text"
            value={this.state.question}
            onChange={this.handleChanges}
            placeholder="What's your question?"
          />
          <input
            id="topic"
            type="text"
            value={this.state.topic}
            onChange={this.handleChanges}
            placeholder="Topic"
          />

          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default QuestionForm;
