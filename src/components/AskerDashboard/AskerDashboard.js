// Packages
import React from "react";
import axios from "axios";

// Components
import QuestionForm from "./QuestionForm";
import AskerQuestionsList from "./AskerQuestionsList";
// import StripeBtn from "../stripe/StripeBtn"; // giving an error for some reason

// Material UI
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  List,
  Button,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";

// Custom Styles
const styles = theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
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
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  column: {
    flexGrow: 1,
    padding: theme.spacing(1),
    width: 680,
    display: "flex",
    justifyContent: "center",
    overflowY: "scroll",
    maxHeight: 860
  },
  shortColumn: {
    flexGrow: 1,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  flex: {
    display: "flex",
    flexDirection: "column"
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
      { mobileOpen, userInfo } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.spaceBetween}>
              <Typography variant="h6" noWrap>
                {userInfo.username}'s Dashboard
              </Typography>
              <Button color="inherit" href="/community">
                Community
              </Button>
              <Button color="inherit" href={`/users/${userInfo.id}`}>
                Profile
              </Button>

              <Button color="inherit">Logout</Button>
            </div>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.dashboardContent}>
            
            <Typography variant="h4">Your Questions</Typography>
            <Typography variant="h5">
              {this.state.questionCount} Questions Asked &nbsp;|&nbsp;{" "}
              {this.state.answerCount} Answers Received
            </Typography>
            <QuestionForm />
            <Paper className={classes.column}>
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
