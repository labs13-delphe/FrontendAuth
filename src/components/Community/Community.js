// Packages
import React from "react";
//**** took care of netlify bugs */
// import { Route, Link, withRouter } from "react-router-dom";
import axios from "axios";

// Components
import CommunityQuestionList from "./CommunityQuestionsList"

class Community extends React.Component{
state = {
    questions: []

}

componentDidMount() {
        // GET ALL Questions data
        const endpoint = `https://delphe-backend.herokuapp.com/api/questions`;
        axios
          .get(endpoint)
          .then(res => {
            console.log("Questions data:", res.data);
            this.setState({ questions: res.data });

          })
          .catch(err => {
            console.log("Can't retrieve asker info", err);
          });
}

render() {
    return (
        <div>
            Community Thread
            <CommunityQuestionList questions={this.state.questions}/>
        </div>
    )
}
}

export default Community;