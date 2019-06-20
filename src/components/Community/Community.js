// Packages
import React from "react";
import axios from "axios";

// Components
import CommunityQuestionList from "./CommunityQuestionsList";

// Material UI
import { CssBaseline, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// Custom Styles
const styles = theme => ({
  root: {
    display: "flex",
    width: "100%"
  },
  title: theme.mixins.toolbar,

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
  paper: {
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

class Community extends React.Component {
  state = {
    questions: []
  };

  componentDidMount() {
    // GET ALL Questions data
    const endpoint = "https://delphe-backend.herokuapp.com/api/questions";
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
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.dashboardContent}>
            <Typography variant="h4" className={classes.title}>
              Community Thread
            </Typography>
            <Paper className={classes.paper}>
              <CommunityQuestionList questions={this.state.questions} />
            </Paper>
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Community);
