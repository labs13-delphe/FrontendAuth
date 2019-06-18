// Packages
import React from "react";
import axios from "axios";
import { Route, Link, withRouter } from "react-router-dom";

// Material UI
import {
  AppBar, CssBaseline, Divider, Drawer, Hidden, List, Button, Paper, ListItem, ListItemIcon, ListItemText, Toolbar, Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';

// Components
import QuestionForm from "./QuestionForm";
import AskerQuestionsList from "./AskerQuestionsList";
import StripeBtn from "../stripe/StripeBtn"

const styles = theme => ({
  root: {
    display: 'flex',
    // width: '96%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  spaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
  },
  dashboardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: 680,
    [theme.breakpoints.down('md')]: {
          width: '100%'
        },
    },
  column : {
    flexGrow: 1,
    padding: theme.spacing(1),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'scroll',
    // [theme.breakpoints.down('md')]: {
    //     width: '100%'
    //   },
    maxHeight: 860
  },
  shortColumn : {
    flexGrow: 1,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        width: '100%'
      },
  },
  flex : {
      display: 'flex',
      flexDirection: 'column'
  }
})

class AskerDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false
    };
  }

  // componentDidMount() {
  //   // GET User's Questions data
  //   const id = localStorage.getItem("user_id");
  //   const endpoint = `https://delphe-backend.herokuapp.com/api/users/${id}/questions`;
  //   axios
  //     .get(endpoint)
  //     .then(res => {
  //       console.log("Askers data:", res.data);
  //       this.setState({ userInfo: res.data });
  //       this.setState({ questions: res.data.questions });
  //       this.setState({ answers: res.data.answers });
  //       this.setState({ questionCount: res.data.questions.length });
  //       this.setState({ answerCount: res.data.answers.length });
  //     })
  //     .catch(err => {
  //       console.log("Can't retrieve asker info", err);
  //     });

  //   // GET Users (askers + experts) data
  //   const allUsers = "https://delphe-backend.herokuapp.com/api/users/";
  //   axios
  //     .get(allUsers)
  //     .then(res => {
  //       console.log("All Users:", res.data);
  //       this.setState({ users: res.data });
  //     })
  //     .catch(err => {
  //       console.log("Can't retrieve all users", err);
  //     });
  // }

  // // DELETE Question
  // deleteQuestion = id => {
  //   axios
  //     .delete(`https://delphe-backend.herokuapp.com/api/questions/${id}`)
  //     .then(res => {
  //       console.log(res.data);
  //       window.location.reload();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // PUT Question function on App.js (Update form is also imported/rendered on App.js)


  render() {
    const { container, classes, data:{userInfo}, addQuestion } = this.props,
    { mobileOpen } = this.state

    return (
      <div 
        className={classes.root}
        >
          <CssBaseline />
          <AppBar position="fixed" 
          className={classes.appBar}
          >
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
                <Button color="inherit">Logout</Button>
              </div>
            </Toolbar>
          </AppBar>
          
          <main 
          className={classes.content}
          >
            <div 
            className={classes.toolbar} 
            />
            <div className={classes.dashboardContent}>

                    <QuestionForm addQuestion={addQuestion} />
                    
                    <h1>My Questions</h1>
                    
                    <Paper className={classes.column}>
                        <AskerQuestionsList data={this.props.data}/>
                    </Paper>
   
            </div>
          </main>
        </div>
    );
  }
}

export default withStyles(styles)(AskerDashboard);
