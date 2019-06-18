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
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import { AccountCircle, Edit, Delete } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { red } from "@material-ui/core/colors";
import clsx from "clsx";

// Custom Styles
const styles = theme => ({
  card: {
    width: "100%",
    marginBottom: 5,
    padding: theme.spacing(1)
  },
  topicButton: {
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
  cardheader: {
    fontSize: 20
  },
  answerCard: {
    padding: 40
  },
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing(1)
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 500
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    width: 500
  },
  select: {
    width: 200
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  dialogue: {
    width: 580
  }
});

class AskerEachQuestion extends React.Component {
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
      expanded: false,
      anchorEl: null,
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
          question: res.data,
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
        console.log("this user:", res.data);
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

  render() {
    const open = Boolean(this.state.anchorEl);
    const { classes } = this.props,
      { expanded, anchorEl, dialogOpen, thisUser, question, answerCount, topics } = this.state;

    // condition: Render Answers Div if question has answers (answerCount > 0)
    const answersDiv =
      this.state.answerCount > 0 ? (
        <div className="answers-div">
          <p>
            <strong>Answers: </strong>
          </p>
          {this.state.answers.map(answer => {
            return (
              <p key={answer.id}>
                "{answer.answer}" -{" "}
                <strong>
                  {this.state.users.map(user => {
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
              </p>
            );
          })}
        </div>
      ) : (
        <p>No answers yet</p>
      );

    const answersText =
      this.state.answerCount === 1 ? <span>answer</span> : <span>answers</span>;
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
              <IconButton
                aria-label="Settings"
                href={`/questions/${this.state.question.id}/update`}
              >
                <Edit />
              </IconButton>
              <IconButton aria-label="Settings" onClick={this.deleteButton}>
                <Delete />
              </IconButton>
            </>
          } 
          title={thisUser.username}
          subheader={thisUser.user_type}

        />
        <CardContent>
          <Typography variant="h4" color="textSecondary" component="p" gutterBottom>
          {question.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {question.question}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {answerCount} {answersText}
          </Typography>
          <div className="topics-div">
            {topics.map(topic => (
              <Button variant="contained" size="small" color="pink" className={classes.topicButton} key={topic.id}>{topic.topic}</Button>
            ))}
          </div>
      </CardContent>

        <div className="question-div">
          <p>
            <Link to={`/questions/${this.state.question.id}/update`}>
              <i className="fas fa-pen" />
            </Link>
            <i onClick={this.deleteButton} className="fas fa-trash" />
            &nbsp;|&nbsp;
            <strong>{this.state.question.title}: </strong>
            {this.state.question.question} <br /> {this.state.answerCount}{" "}
            {answersText}
          </p>
        </div>
        <div className="topics-div">
          <p>
            <strong>Topic: </strong>
            {this.state.topics.map(topic => (
              <span key={topic.id}>{topic.topic}, </span>
            ))}
          </p>
        </div>
        {answersDiv}
      </Card>
    );
  }
}

export default withStyles(styles)(AskerEachQuestion);
