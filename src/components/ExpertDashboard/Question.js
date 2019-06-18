import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Edit from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import AnswerForm from './AnswerForm'

import axios from 'axios'

const styles = theme => ({
  card: {
    maxWidth: 580,
    marginBottom: 5
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardheader: {
      fontSize: 20,
  },
  answerCard: {
      padding: 40,
  },
  popover: {
      pointerEvents: 'none',
  },
  paper: {
  padding: theme.spacing(1),
  },
  bottomRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 500
    },
  formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
  },
  dialogue: {
      width: 580
  },
  //pasted
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400,
      [theme.breakpoints.down('md')]: {
        width: 300
      },
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    // paper: {
    //   maxWidth: 680,
    //   [theme.breakpoints.down('md')]: {
    //     width: '100%'
    //   },
    // },
    bottomRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    select: {
      width: 200
    }
})


class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      AnchorEl: null,
      question: {},
      topics: [],
      answers: [],
      answerCount: null,
      users: [],
      question_id: this.props.id,
      user_id: localStorage.getItem("user_id"),
      answer: "",
      isEditing: false,
      singleAnswer: {
        id: null,
        user_id: null,
        question_id: null,
        answer: ""
      }
    };
  }

  componentDidMount() {
    const id = this.props.question.id;
    const endpoint = `https://delphe-backend.herokuapp.com/api/questions/${id}`;

  // SETTING QUESTION INFORMATION
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

  // ======== CONTROL EXPANDING ANSWERS
  handleExpandClick= () => {
    this.setState({
        expanded: !this.state.expanded
    })
}

// ================ CONTROL USER PROFILE POPOVER

handlePopoverOpen = (event) => 
this.setState({
    anchorEl: event.currentTarget
    });

handlePopoverClose = () => 
this.setState({
    anchorEl: null
    });


  render() {
    console.log("question props", this.props);
    console.log("question state", this.state);

    const open = Boolean(this.state.anchorEl);
    const { question, classes, postAnswer, userInfo } = this.props,
          { answer, answers, expanded, anchorEl } = this.state

    return (
          <Card className={classes.card}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        R
                    </Avatar>
                    }
                    action={
                    <>
                    {/* <IconButton aria-label="Settings">
                        <Edit onClick={this.handleClickOpen} />
                    </IconButton> */}
                    {/* <Dialog open={dialogOpen} onClose={this.handleClose} className={classes.dialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit Question</DialogTitle>
                        <DialogContent >
                        <form className={classes.form}>
                            <TextField
                            value={editedTitle}
                            name='editedTitle'
                            label="Title"
                            placeholder=""
                            multiline
                            className={classes.textField}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            />
                            <div className={classes.bottomRow}>
                            <TextField
                            value={editedQuestion}
                            name='editedQuestion'
                            label="My question is..."
                            placeholder=""
                            multiline
                            className={classes.textField}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            />                           
                            </div>
                            </form>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="secondary">
                            Delete
                        </Button>
                        <Button onClick={this.handleClose} variant="contained" color="primary">
                            Submit
                        </Button>
                        </DialogActions>
                    </Dialog> */}
                    </>
                    }
                    
                    title={userInfo.username}
                    // subheader={question.topics.map(topic => <p>{topic.topic}</p>)}
                />
                <CardContent>
                    <Typography variant="h4" color="textSecondary" component="p" gutterBottom>
                    {question.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {question.question}
                    </Typography>

                </CardContent>
                <CardActions disableSpacing>
                    <Typography>
                        See answers: ({answers.length})
                    </Typography>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {answers.map( ({ answer }) =>
                    <CardContent className={classes.answerCard}>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="avatar" className={classes.avatar}>
                                R
                            </Avatar>
                            }
                            action={
                                <IconButton aria-label="Settings">
                                <AccountCircle 
                                onMouseEnter={this.handlePopoverOpen}
                                onMouseLeave={this.handlePopoverClose}
                                />
                                <Popover
                                    id="mouse-over-popover"
                                    className={classes.popover}
                                    classes={{
                                    paper: classes.paper,
                                    }}
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}
                                    onClose={this.handlePopoverClose}
                                    disableRestoreFocus
                                >
                                    <Typography>View Profile</Typography>
                                </Popover>
                            </IconButton>
                            }
                            title='user name'
                            subheader="Topic 1"
                        />
                        <Typography paragraph>
                            {answer}
                        </Typography>
                    </CardContent>
                )}
                </Collapse>
                    {/* <AnswerForm postAnswer={postAnswer} /> */}

                    <form className={classes.form}>
                      <div className={classes.bottomRow}>
                      <TextField
                        value={answer}
                        name='answer'
                        label="Answer"
                        placeholder=""
                        multiline
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        />
                    
                        {answer ? 
                        <Button 
                          variant="contained" 
                          color="primary" 
                          className={classes.button} 
                          onClick={this.sendQuestion}
                          >
                            Submit
                        </Button> :
                        <Button variant="contained" color="primary" disabled className={classes.button}>
                          Submit
                        </Button>
                      }
                        
                      </div>
                  </form>
                </Card>
            );
            }


//       <div class="form-group shadow-textarea">
//         <h4>{this.props.question.question}</h4>
//         <div class="accordion" id="myAccordion">

// <div class="card">
// <div class="card-header" id="item1Header">
//      <h5 class="mb-0">
//        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#expandable1" aria-expanded="false" aria-controls="expandable1">
//          Provide Answer
//        </button>
//      </h5>
//    </div>
//    <div id="expandable1" class="collapse" aria-labelledby="item1Header" data-parent="#myAccordion">
//      <div class="card-body"></div>
//         <form onSubmit={this.submitAnswer}>
//           <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3"
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
//       </div>
//       </div>
//       </div>
//       </div>
//     );
//   }
}

export default withStyles(styles)(Question);
