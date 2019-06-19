// Packages
import React from "react";
import axios from "axios";

// Components
import QuestionForm from "./QuestionForm";
import AskerQuestionsList from "./AskerQuestionsList";
// import StripeBtn from "../stripe/StripeBtn"; // giving an error for some reason

// Material UI
import {
  CssBaseline,
  Paper,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// Custom Styles
const styles = theme => ({
  root: {
    display: "flex"
  },
  title: {
    ...theme.mixins.toolbar,
  textAlign: "center"
},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center"
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  dashboardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    maxWidth: 680,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  Paper: {
    flexGrow: 1,
    padding: theme.spacing(1),
    width: 680,
    display: "flex",
    justifyContent: "center",
    overflowY: "scroll",
    maxHeight: 860,
    background: "#EBEBEA"
  }
});

class AskerDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      questions: [],
      answers: [],
      questionCount: "",
      answerCount: "",
      users: [],
      mobileOpen: false
    };
  }

  componentDidMount() {
    // GET User's Questions data
    const id = localStorage.getItem("user_id");
    const endpoint = `https://delphe-backend.herokuapp.com/api/users/${id}/questions`;
    axios
      .get(endpoint)
      .then(res => {
        console.log("Askers data:", res.data);
        this.setState({
          userInfo: res.data,
          questions: res.data.questions,
          answers: res.data.answers,
          questionCount: res.data.questions.length,
          answerCount: res.data.answers.length
        });
      })
      .catch(err => {
        console.log("Can't retrieve asker info", err);
      });

    // GET Users (askers + experts) data
    const allUsers = "https://delphe-backend.herokuapp.com/api/users/";
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

  // DELETE Question
  deleteQuestion = id => {
    axios
      .delete(`https://delphe-backend.herokuapp.com/api/questions/${id}`)
      .then(res => {
        console.log(res.data);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // PUT Question
  updateQuestion = question => {
    axios
      .put(
        `https://delphe-backend.herokuapp.com/api/questions/${question.id}`,
        question
      )
      .then(res => {
        console.log(res.data);
        // reload window
        window.location.reload();
      })
      .catch(err => {
        console.log("Can't update!", err);
      });
  };

  render() {
    const { container, classes } = this.props,
      { userInfo } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.dashboardContent}>
            <div className={classes.title}>
              <Typography variant="h4">Your Questions</Typography>

              <Typography variant="h5">
                {this.state.questionCount} Questions Asked &nbsp;|&nbsp;{" "}
                {this.state.answerCount} Answers Received
              </Typography>
            </div>

            <QuestionForm />
            <Paper className={classes.Paper}>
              <AskerQuestionsList
                questions={this.state.questions}
                deleteQuestion={this.deleteQuestion}
                updateQuestion={this.updateQuestion}
              />
            </Paper>
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(AskerDashboard);
