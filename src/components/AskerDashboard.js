import React from "react";
import axios from "axios";

// Components
import QuestionForm from "./QuestionForm";

// Notes for next week
// issues with Auth0 and react-router-dom
// Tried the following (now deleted)
// on App, I did <Provider><Secret {...this.props} /></Provider>
// on Secret.js I did export default withRouter(Secret);
// Then rendered AskerDashboard on Secret.js like <Route path="/dashboard/asker" component={AskerDashboard} />
// Added a button on Secret that sets user_id 1 and user_type asker to local storage to be able to pull in asker data on askerdashboard and takes user to /dashboard/asker
// When I click the button, the url changes, but I'm asked to login again and then taken back to the secret page not askerdashboard

const questionStyle = {
  "text-align": "left",
"padding-left": "20px",
color: '#021636'

};

const answerStyle = {
"text-align": "left",
"padding-left": "50px",
};

const expertName = {
  color: '#058562',
};

class AskerDashboard extends React.Component {
  state = {
    userInfo: {},
    questions: [],
    answers: [],
    questionCount: "",
    answerCount: "",
    users: []
  };

  componentDidMount() {
    const id = localStorage.getItem("user_id");
    const endpoint = `http://localhost:5000/api/users/${id}/questions`;
    axios
      .get(endpoint)
      .then(res => {
        console.log("Askers data:", res.data);
        this.setState({ userInfo: res.data });
        this.setState({ questions: res.data.questions });
        this.setState({ answers: res.data.answers });
        this.setState({ questionCount: res.data.questions.length });
        this.setState({ answerCount: res.data.answers.length });
      })
      .catch(err => {
        console.log("Can't retrieve asker info", err);
      });

    // get all users
    const allUsers = "http://localhost:5000/api/users/";
    axios
      .get(allUsers)
      .then(res => {
        console.log("All Users:", res.data);
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log("Can't retrieve all users", err);
      });
  }

  

  render() {
    return (
      <>
        <h2>AskerDashboard</h2>
        <QuestionForm/>
        <p>
          {this.state.questionCount} Questions Asked &nbsp;|&nbsp;{" "}
          {this.state.answerCount} Answers Received
        </p>
        <section>
          <h3>Your Questions</h3>
          <div>
            {this.state.questions.map(question => (
              <div key={question.id}>
                <p style={questionStyle}>{question.question}</p>
              </div>
            ))}
          </div>
        </section>
        {/* <section>
          <h3>Your Answers</h3>
          <div>
            {this.state.answers.map(answer => (
              <div key={answer.id}>
                <p>
                  <strong>
                    {this.state.users.map(user => {
                      if (user.id === answer.user_id) {
                        return user.username;
                      }
                    })}
                    :{" "}
                  </strong>
                  {answer.answer}
                </p>
              </div>
            ))}
          </div>
        </section> */}
        <section>
          <h3>Your Answers</h3>
          <div>
            {this.state.questions.map(question => ( 
              // if (answers.question_id.includes(question.id) 
              <div key={question.id}>
                <p style={questionStyle}>{question.question}</p>
                {this.state.answers.map(answer => { // map through answers to return answers with question_id that matches question.id
                  if (answer.question_id === question.id) {
                    return ( 
                      <p style={answerStyle}>
                        <strong style={expertName}>
                          {this.state.users.map(user => { // map through users to match the user.id to the answer.user_id to get expert's username and return expert username with the answer.answer
                            if (user.id === answer.user_id) {
                              return user.username;
                            }
                          })}
                          :{" "}
                        </strong>
                        {answer.answer}
                      </p>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }
}

export default AskerDashboard;
