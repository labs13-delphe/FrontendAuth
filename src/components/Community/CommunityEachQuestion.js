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
  Button,
  List,
  ListItem,
  Divider
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { red } from "@material-ui/core/colors";
import clsx from "clsx";

// Custom Styles
const styles = theme => ({
  card: {
    width: "75%",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  cardTitle: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitleMobile: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      display: "flex",
      alignItems: "center",
    }
  },
  topicButton: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
    "&:hover": {
      cursor: "default",
      backgroundColor: "#3f51b5"
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
  bigAvatar: {
    margin: 0,
    width: 80,
    height: 80
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

class CommunityEachQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      topics: [],
      answers: [],
      answerCount: null,
      users: [],
      expanded: false
    };
  }

  componentDidMount() {
    const id = this.props.question.id;
    const endpoint = `https://delphe-backend.herokuapp.com/api/questions/${id}`;

    axios
      .get(endpoint)
      .then(res => {
        // console.log(res.data);
        this.setState({ question: res.data });
        this.setState({ topics: res.data.topics });
        this.setState({ answers: res.data.answers });
        this.setState({ answerCount: res.data.answers.length });
      })
      .catch(err => {
        console.log(err);
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

  // Material UI Methods

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const { classes } = this.props,
      { expanded, question, answerCount, topics, answers, users } = this.state;
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
        <span className={classes.noAnswers}>No answers yet</span>
      );

    const answersText =
      this.state.answerCount === 1 ? <span>answer</span> : <span>answers</span>;

    const cardTitle = this.state.users.map(user => {
      // Get Asker's First, Last, and username
      if (user.id === this.state.question.user_id) {
        return (
          <div className={classes.cardTitle} key={user.id}>
            <Typography variant="h5" className={classes.cardTitleMobile}>
              {" "}
              {user.first_name} {user.last_name}
            </Typography>{" "}
            <Typography variant="h6">
              <Link to={`/users/${user.id}`} className={`${classes.buttonBlue} ${classes.cardTitleMobile}`}>
                {" "}
                View Profile
              </Link>
            </Typography>
          </div>
        );
      } else {
        return null;
      }
    });

    const cardSubtitle = this.state.users.map(user => {
      // Get Asker's First, Last, and username
      if (user.id === this.state.question.user_id) {
        return (
          <div className={classes.cardSubtitle} key={user.id}>
            <Typography variant="h6" className={classes.cardTitleMobile}>@{user.username}</Typography>
          </div>
        );
      } else {
        return null;
      }
    });
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {/* Getting Asker's Initials for Avatar */}
              {this.state.users.map(user => {
                if (user.id === this.state.question.user_id) {
                  return (
                    <div className="user-info-div" key={user.id}>
                      {user.first_name.substring(0, 1)}{" "}
                      {user.last_name.substring(0, 1)}
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </Avatar>
          }
          title={cardTitle}
          subheader={cardSubtitle}
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
                disableRipple={true}
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

export default withStyles(styles)(CommunityEachQuestion);
