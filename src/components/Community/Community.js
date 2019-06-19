// Packages
import React from "react";
import axios from "axios";

// Components
import CommunityQuestionList from "./CommunityQuestionsList";

// Material UI
import {
  AppBar,
  CssBaseline,
  Button,
  Paper,
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
        {/* <AppBar position="fixed" className={classes.appBar}>
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
                Replace This
              </Typography>
              <Button color="inherit" href="/community">
                Community
              </Button>
              <Button color="inherit" href="/secret/dashboard">
                Your Questions
              </Button>
              <Button color="inherit">Profile</Button>

              <Button color="inherit">Logout</Button>
            </div>
          </Toolbar>
        </AppBar> */}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.dashboardContent}>
            <Typography variant="h4">Community Thread</Typography>
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
