import React from "react";

import QuestionsList from "./QuestionsList";
import axios from "axios";

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
    const { classes } = this.props;
    console.log("expert dash", this.props);
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
            <Paper className={classes.Paper}>
              <QuestionsList
                questions={this.props.questions}
                answers={this.state.answers}
                postAnswer={this.props.postAnswer}
                QA={this.props.QA}
                editAnswer={this.editAnswer}
                deleteAnswer={this.deleteAnswer}
                gUser={this.props.gUser}
              />
            </Paper>
          </div>
        </main>
      </div>

      // <div>
      // //   <h2>Expert dash</h2>
      //   <QuestionsList
      //     questions={this.props.questions}
      //     answers={this.state.answers}
      //     postAnswer={this.props.postAnswer}
      //     QA={this.props.QA}
      //     editAnswer={this.editAnswer}
      //     deleteAnswer={this.deleteAnswer}
      //     gUser={this.props.gUser}
      //   />
      // </div>
    );
  }
}

export default withStyles(styles)(ExpertDashboard);
