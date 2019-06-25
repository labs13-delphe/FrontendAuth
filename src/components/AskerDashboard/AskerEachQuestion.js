// Packages
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Material UI
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  List,
  ListItem,
  Divider
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { red } from "@material-ui/core/colors";
import clsx from "clsx";

// Custom Styles
const styles = theme => ({
  card: {
    width: "75%",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  iconButton: {
    "&:focus": {
      backgroundColor: "white" // removes the default teal background
    }
  },
  topicButton: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
    "&:hover": {
      cursor: "default"
    },
    "&:focus": {
      backgroundColor: "#3f51b5" // removes the default teal background
    }
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    "&:focus": {
      backgroundColor: "white" // to remove teal
    },
    "&:hover": {
      backgroundColor: "#e0e0e0" // to match grey in CardAction div
    }
  },
  expandOpen: {
    transform: "rotate(180deg)",
    "&:focus": {
      backgroundColor: "#e0e0e0" // removes the default teal background
    },
    "&:hover": {
      backgroundColor: "#e0e0e0" // to match grey in CardAction div
    }
  },
  avatar: {
    backgroundColor: red[500]
  },
  dialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    background: "orange"
  },
  textField: {
    width: "90%",
    margin: theme.spacing(1)
  },
  formButtons: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly"
  },
  button: {
    margin: theme.spacing(1)
  },
  answersDiv: {
    textAlign: "left"
  },
  noAnswers: {
    marginLeft: theme.spacing(1)
  },
  hoverGrey: {
    "&:hover": {
      background: "#e0e0e0",
      cursor: "pointer"
    }
  },
  buttonBlue: {
    color: "#3f51b5"
  }
});

class AskerEachQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisUser: {
        username: "",
        first_name: "",
        last_name: "",
        image_url: ""
      },
      question: {
        user_id: "",
        question: "",
        title: "",
        id: null
      },
      topics: [],
      answers: [],
      answerCount: null,
      users: [],
      expanded: false,
      dialogOpen: false
    };
  }

  componentDidMount() {
    // GET QUESTION INFO
    const id = this.props.question.id;
    const endpoint = `https://delphe-backend.herokuapp.com/api/questions/${id}`;

    axios
      .get(endpoint)
      .then(res => {
        // console.log(res.data);
        this.setState({
          question: {
            user_id: res.data.user_id,
            question: res.data.question,
            title: res.data.title,
            id: res.data.id
          },
          topics: res.data.topics,
          answers: res.data.answers,
          answerCount: res.data.answers.length
        });
      })
      .catch(err => {
        console.log(err);
      });

    // GET THIS ASKER INFO
    const asker_id = localStorage.getItem("user_id");
    const userEndpoint = `https://delphe-backend.herokuapp.com/api/users/${asker_id}`;
    axios
      .get(userEndpoint)
      .then(res => {
        // console.log("this user:", res.data);
        this.setState({ thisUser: res.data });
      })
      .catch(err => {
        console.log("can't get this asker's info.");
      });

    // GET ALL USERS
    const usersEndpoint = "https://delphe-backend.herokuapp.com/api/users/";
    axios
      .get(usersEndpoint)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log("Can't retrieve all users", err);
      });
  }

  // Delete Question Button
  deleteButton = event => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this question?")) {
      this.props.deleteQuestion(this.state.question.id);
    }
  };

  // Edit Question Button
  handleChanges = e => {
    e.persist();
    const { name, value } = e.target;
    this.setState(prevState => ({
      question: {
        ...prevState.question,
        [name]: value
      }
    }));
  };

  submitForm = e => {
    e.preventDefault();
    // invoke updateQuestion from AskerDashboard.js
    this.props.updateQuestion(this.state.question);
  };

  // Material UI Methods

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  handleClickOpen = () =>
    this.setState({
      dialogOpen: true
    });

  handleClose = () =>
    this.setState({
      dialogOpen: false
    });

  render() {
    const { classes } = this.props,
      {
        expanded,
        dialogOpen,
        thisUser,
        question,
        answerCount,
        topics,
        answers,
        users
      } = this.state;

    // condition: Render Answers Div if question has answers (answerCount > 0)
    const answersDiv =
      this.state.answerCount > 0 ? (
        <div className="answersDiv">
          <List>
            {answers.map(answer => {
              return (
                <div key={answer.id}>
                  <Divider />
                  <ListItem>
                    <p>
                      "{answer.answer}" -{" "}
                      <strong>
                        {users.map(user => {
                          if (user.id === answer.user_id) {
                            return (
                              <Link
                                to={`/users/${user.id}`}
                                key={user.id}
                                className={classes.buttonBlue}
                              >
                                {user.username}
                              </Link>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </strong>
                    </p>
                  </ListItem>
                </div>
              );
            })}
          </List>
        </div>
      ) : (
        <p className={classes.noAnswers}>No answers yet</p>
      );

    const answersText =
      this.state.answerCount === 1 ? <span>answer</span> : <span>answers</span>;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            thisUser.image_url ? (
              <Avatar alt="Remy Sharp" src={thisUser.image_url} />
            ) : (
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {/* Getting Asker's Initials for Avatar */}
                {thisUser.first_name.substring(0, 1)}
                {thisUser.last_name.substring(0, 1)}
              </Avatar>
            )
          }
          action={
            <>
              <IconButton
                aria-label="Settings"
                onClick={this.handleClickOpen}
                className={classes.iconButton}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="Settings"
                onClick={this.deleteButton}
                className={classes.iconButton}
              >
                <Delete />
              </IconButton>
              {/* FOR UPDATE POP UP */}
              <Dialog
                open={dialogOpen}
                onClose={this.handleClose}
                className={classes.dialog}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Edit Your Question
                </DialogTitle>
                <DialogContent className="form">
                  <TextField
                    value={question.title}
                    name="title"
                    label="Title"
                    placeholder="Question title..."
                    multiline
                    className={classes.textField}
                    onChange={this.handleChanges}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    value={question.question}
                    name="question"
                    label="Question"
                    placeholder="I want to know..."
                    multiline
                    className={classes.textField}
                    onChange={this.handleChanges}
                    margin="normal"
                    variant="outlined"
                  />
                </DialogContent>
                <DialogActions className="formButtons">
                  <Button
                    onClick={this.handleClose}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Cancel
                  </Button>
                  {question.title && question.question ? (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={this.submitForm}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled
                      className={classes.button}
                    >
                      Submit
                    </Button>
                  )}
                </DialogActions>
              </Dialog>
            </>
          }
          title={thisUser.username}
          subheader={thisUser.user_type}
        />
        <CardContent>
          <Typography
            variant="h4"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {question.title}
          </Typography>
          <Typography variant="h5" color="textSecondary" component="p">
            {question.question}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            {answerCount} {answersText}
          </Typography>
          <div className="topics-div">
            {topics.map(topic => (
              <Button
                variant="contained"
                size="small"
                color="primary"
                disableRipple="true"
                className={classes.topicButton}
                key={topic.id}
              >
                {topic.topic}
              </Button>
            ))}
          </div>
        </CardContent>
        <Divider />
        <CardActions
          onClick={this.handleExpandClick}
          className={classes.hoverGrey}
        >
          <Typography>View Answers: ({answerCount}) </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography paragraph>{answersDiv}</Typography>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(AskerEachQuestion);
