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

const styles = theme => ({
  card: {
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  topicButton: {
    margin: theme.spacing(1),
    '&:hover': {
      cursor: 'default',
    }
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
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
  }
});

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisUser: {
        username: "",
        first_name: "",
        last_name: ""
      },
      question: {},
      topics: [],
      answers: [],
      answerCount: null,
      users: [],
      question_id: this.props.id,
      user_id: localStorage.getItem("user_id"),
      answer: "",
      isEditing: false,
      expanded: false,
      dialogOpen: false,
      singleAnswer: {
        id: null,
        user_id: null,
        question_id: null,
        answer: ""
      }
    };
  }

  componentDidMount() {
    const id = this.props.id;
    const endpoint = `https://delphe-backend.herokuapp.com/api/questions/${id}`;

    // SETTING QUESTION INFORMATION
    axios
      .get(endpoint)
      .then(res => {
        console.log(res.data);
        this.setState({
          question: res.data,
          topics: res.data.topics,
          answers: res.data.answers,
          answerCount: res.data.answers.length
        });
      })
      .catch(err => {
        console.log(err);
      });

    // GET ALL USERS (to get usernames)
    const usersEndpoint = "https://delphe-backend.herokuapp.com/api/users/";
    axios
      .get(usersEndpoint)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log("Can't retrieve all users", err);
      });

    // GET THIS EXPERT INFO
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
  }

  

  // ========= GET EXPERT ANSWERS
  getUsersAnswer = answer_id => {
    axios
      .get(`https://delphe-backend.herokuapp.com/api/answers/${answer_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          singleAnswer: {
            question_id: res.data.question_id,
            user_id: res.data.user_id,
            answer: res.data.answer,
            id: res.data.id
          }
        });
      })
      .catch(err => {
        console.log("couldn't get an answer based on that id");
      });
  };

  // ========= POST ANSWER
  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  submitAnswer = e => {
    e.preventDefault();
    let answer = {
      question_id: this.props.id,
      user_id: localStorage.getItem("user_id"),
      answer: this.state.answer
    };
    this.props.postAnswer(answer);
  };

  // ========= UPDATE ANSWER
  // Toggle isEditing
  handleEdit = (e, answer_id) => {
    e.preventDefault();
    this.setState({ isEditing: true });

    this.getUsersAnswer(answer_id);
  };

  handleEditChange = e => {
    this.setState({
      ...this.state,
      singleAnswer: {
        ...this.state.singleAnswer,
        [e.target.name]: e.target.value
      }
    });
  };

  submitEdit = e => {
    e.preventDefault();
    this.props.editAnswer(this.state.singleAnswer);
  };

  // ========= DELETE ANSWER
  deleteAnswer = (e, answer_id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this answer?")) {
      this.props.deleteAnswer(answer_id);
    }
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
    const { answers, users, thisUser, answerCount, question, topics, dialogOpen, expanded } = this.state,
          { classes } = this.props
    // console.log("question props", this.props);
    // console.log("question state", this.state);
    // condition: Render Answers Div if question has answers (answerCount > 0)
    const answersDiv =
      this.state.answerCount > 0 ? (
        <div className="answers-div">
          <List>
            {answers.map(answer => {
              return (
                <div key={answer.id}>
                  <Divider />
                  <ListItem >
                    "{answer.answer}" -{" "}
                    <strong>
                      {users.map(user => {
                        if (user.id === answer.user_id) {
                          return (
                            <Link to={`/users/${user.id}`} key={user.id}>
                              {user.username}
                            </Link>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </strong>
                  </ListItem>
                </div>
              );
            })}
          </List>
        </div>
      ) : (
        <p>No answers yet</p>
      );
          {/* <p style={generalAlign}>
            <strong>Answers: </strong>
          </p>
          {this.state.answers.map(answer => {
            return (
              <p style={answerStyle} key={answer.id}>
                <button
                  onClick={e => {
                    this.handleEdit(e, answer.id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={e => {
                    this.deleteAnswer(e, answer.id);
                  }}
                >
                  Delete
                </button>
                "{answer.answer}" -{" "}
                <strong style={expertName}>
                  {this.state.users.map(user => {
                    if (user.id === answer.user_id) {
                      return (
                        <Link to={`/users/${user.id}`} key={user.id}>{user.username}</Link>
                      );
                    } else {
                      return null;
                    }
                  })}
                </strong>
              </p>
            );
          })}
        </div>
      ) : (
        <p>No answers yet</p>
      ); */}
      const answersText = this.state.answerCount === 1 ? <span>answer</span> : <span>answers</span>;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {/* Getting Asker's Initials for Avatar */}
              {thisUser.first_name.substring(0, 1)}
              {thisUser.last_name.substring(0, 1)}
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label="Settings" onClick={this.handleClickOpen}>
                <Edit  />
              </IconButton>
              <IconButton aria-label="Settings" onClick={this.deleteButton}>
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
                className={classes.topicButton}
                key={topic.id}
              >
                {topic.topic}
              </Button>
            ))}
          </div>
        </CardContent>
        <Divider />
        <CardActions>
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
    //   <div style={bordered}>
    //     <div className="question-div">
        
    //         {this.state.users.map(user => {
    //           if (user.id === this.state.question.user_id) {
    //             return (
    //               <div className="user-info-div" style={generalAlign} key={user.id}>
    //                 <p>
    //                   {user.first_name} {user.last_name} @{user.username}
    //                   <Link to={`/users/${user.id}`}>View Profile</Link>
    //                 </p>
    //               </div>
    //             );
    //           } else {
    //             return null;
    //           }
    //         })}
          
    //       <p style={generalAlign}>
    //         {/* <Link to={`/questions/${this.state.question.id}/update`}>
    //           <i className="fas fa-pen" />
    //         </Link>
    //         <i onClick={this.deleteButton} className="fas fa-trash" />
    //         &nbsp;|&nbsp; */}
    //         <strong>{this.state.question.title}: </strong>
    //         {this.state.question.question} <br /> {this.state.answerCount}{" "}
    //         {answersText}
    //       </p>
    //     </div>

    //     <div className="topics-div">
    //       <p style={generalAlign}>
    //         <strong>Topic: </strong>
    //         {this.state.topics.map(topic => (
    //           <span key={topic.id}>{topic.topic}, </span>
    //         ))}
    //       </p>
    //     </div>
    //     {answersDiv}

    //     <div>
    //       {this.state.isEditing ? (
    //         <form onSubmit={this.submitEdit}>
    //           <input
    //             label="singleAnswer"
    //             type="text"
    //             name="answer"
    //             value={this.state.singleAnswer.answer}
    //             placeholder="answer"
    //             onChange={this.handleEditChange}
    //             className="answer-input"
    //           />
    //           <button onClick={this.submitEdit}>Save Edit</button>
    //         </form>
    //       ) : (
    //         <form onSubmit={this.submitAnswer}>
    //           <input
    //             label="answer"
    //             type="text"
    //             name="answer"
    //             value={this.state.answer}
    //             placeholder="answer"
    //             onChange={this.handleChange}
    //             className="answer-input"
    //           />
    //           <button onClick={this.submitAnswer}>Submit</button>
    //         </form>
    //       )}
    //     </div>
    //   </div>
    // );
  }
}

export default withStyles(styles)(Question);
