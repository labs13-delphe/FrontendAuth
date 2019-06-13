// Packages
import React from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";

// Styles
const questionStyle = {
  "text-align": "left",
  "padding-left": "20px",
  color: "#021636"
};

const answerStyle = {
  "text-align": "left",
  "padding-left": "50px"
};

const expertName = {
  color: "#058562"
};

const AskerAnswersList = props => {
  return (
    <div>
      {props.questions.map(question => (
        // if (answers.question_id.includes(question.id)
        <div key={question.id}>
          <p style={questionStyle}> <strong>{question.title}: </strong>{question.question}</p>
          {props.answers.map(answer => {
            // map through answers to return answers with question_id that matches question.id
            if (answer.question_id === question.id) {
              return (
                <p style={answerStyle}>
                  
                    "{answer.answer}" - <strong style={expertName}> 
                    {props.users.map(user => {
                      // map through users to match the user.id to the answer.user_id to get expert's username and return expert username with the answer.answer
                      if (user.id === answer.user_id) {
                        return  user.username;
                      }
                    })}
                    
                  </strong>
                  
                </p>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default AskerAnswersList;
