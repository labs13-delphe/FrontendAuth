// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// // Temp Styles -- Delete When Styling For Real
// const bordered = {
//   border: "1px solid black",
//   background: "#EEFBFC",
//   margin: "15px"
// };
// const generalAlign = {
//   "text-align": "left",
//   "padding-left": "20px"
// };

// const answerStyle = {
//   "text-align": "left",
//   "padding-left": "50px"
// };

// const expertName = {
//   color: "#058562"
// };

// class EachQuestion extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       question: {},
//       topics: [],
//       answers: [],
//       answerCount: null,
//       users: []
//     };
//   }

//   componentDidMount() {
//     const id = this.props.question.id;
//     const endpoint = `https://delphe-backend.herokuapp.com/api/questions/${id}`;

//     axios
//       .get(endpoint)
//       .then(res => {
//         // console.log(res.data);
//         this.setState({ question: res.data });
//         this.setState({ topics: res.data.topics });
//         this.setState({ answers: res.data.answers });
//         this.setState({ answerCount: res.data.answers.length });
//       })
//       .catch(err => {
//         console.log(err);
//       });

//     // GET ALL USERS
//     const usersEndpoint = "https://delphe-backend.herokuapp.com/api/users/";
//     axios
//       .get(usersEndpoint)
//       .then(res => {
//         this.setState({ users: res.data });
//       })
//       .catch(err => {
//         console.log("Can't retrieve all users", err);
//       });
//   }

//   // Delete Question Button
//   deleteButton = event => {
//     event.preventDefault();
//     if (window.confirm("Are you sure you want to delete this question?")) {
//       this.props.deleteQuestion(this.state.question.id);
//     }
//   };

//   render() {
//     // condition: Render Answers Div if question has answers (answerCount > 0)
//     const answersDiv =
//       this.state.answerCount > 0 ? (
//         <div className="answers-div">
//           <p style={generalAlign}>
//             <strong>Answers: </strong>
//           </p>
//           {this.state.answers.map(answer => {
//             return (
//               <p style={answerStyle}>
//                 "{answer.answer}" -{" "}
//                 <strong style={expertName}>
//                   {this.state.users.map(user => {
//                     if (user.id === answer.user_id) {
//                       return (
//                         <Link to={`/users/${user.id}`} >{user.username}</Link>);
//                     }
//                   })}
//                 </strong>
//               </p>
//             );
//           })}
//         </div>
//       ) : (
//         <p>No answers yet</p>
//       );
//     return (
//       <div style={bordered}>
//         <div className="question-div">
//           <p style={generalAlign}>
//             <Link to={`/questions/${this.state.question.id}/update`}>
//               <i class="fas fa-pen" />
//             </Link>
//             <i onClick={this.deleteButton} class="fas fa-trash" />
//             &nbsp;|&nbsp;
//             <strong>{this.state.question.title}: </strong>
//             {this.state.question.question} <br /> {this.state.answerCount}{" "}
//             answers
//           </p>
//         </div>

//         <div className="topics-div">
//           <p style={generalAlign}>
//             <strong>Topic: </strong>
//             {this.state.topics.map(topic => (
//               <span>{topic.topic}, </span>
//             ))}
//           </p>
//         </div>
//         {answersDiv}
//       </div>
//     );
//   }
// }

// export default EachQuestion;

import React from "react";

//Material UI
import { withStyles, Card, CardHeader, CardContent, CardActions, Collapse, Avatar, IconButton, Typography,
        Popover, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputLabel, FormControl,
        Select, MenuItem
} from '@material-ui/core'
import { AccountCircle, Edit } from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';


import { Link } from "react-router-dom";
import axios from "axios";

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
  form: {
      display: 'flex',
      flexDirection: 'column',
  },
  textField : {
      width: 500
  },
  select: {
      width: 200
  },
  formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
  },
  dialogue: {
      width: 580
  }
})

class EachQuestion extends React.Component {
  constructor(props) {
    super(props)

    this.state={
        expanded: false,
        answers: [],
        AnchorEl: null,
        dialogOpen: false,
        editedQuestion: '',
        editedTitle: ''
    }

}

componentDidMount() {
    const { id } = this.props
    const endpoint = `http://localhost:5000/api/answers/questions/${id}`;

    this.setState({
        editedQuestion: this.props.question,
        editedTitle: this.props.title
    })

    axios
      .get(endpoint)
      .then(res => {
        console.log("Askers data:", res.data);
        this.setState({
            answers: res.data
        })
      })
      .catch(err => {
        console.log("Can't retrieve asker info", err);
      });
}

handleExpandClick= () => {
    this.setState({
        expanded: !this.state.expanded
    })
}

handlePopoverOpen = (event) => 
    this.setState({
        anchorEl: event.currentTarget
        });

handlePopoverClose = () => 
    this.setState({
        anchorEl: null
        });

//Handlers for dialogue
handleClickOpen = () =>
    this.setState({
        dialogOpen: true
    })

handleClose = () =>
    this.setState({
        dialogOpen: false
    })

//handle change for form inputs on dialog
handleChange = e => 
  this.setState({
    [e.target.name]: e.target.value
  })



render() {
    const open = Boolean(this.state.anchorEl);
    const { classes } = this.props,
          { title, question, userInfo : {username} } = this.props,
          { expanded, answers, anchorEl, dialogOpen, editedTitle, editedQuestion } = this.state

return(
  <Card className={classes.card}>
      <CardHeader
          avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
              R
          </Avatar>
          }
          action={
          <>
          <IconButton aria-label="Settings">
              <Edit onClick={this.handleClickOpen} />
          </IconButton>
          <Dialog open={dialogOpen} onClose={this.handleClose} className={classes.dialog} aria-labelledby="form-dialog-title">
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
          </Dialog>
          </>
          }
          
          title={username}
          subheader="Topic 1"
      />
      <CardContent>
          <Typography variant="h4" color="textSecondary" component="p" gutterBottom>
          {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {question}
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
          {/* <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
          <ShareIcon />
          </IconButton> */}
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
          {answers.map( ({ answer, username }) =>
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
                  title={username}
                  // subheader="Topic 1"
              />
              <Typography paragraph>
                  {answer}
              </Typography>
          </CardContent>
      )}
      </Collapse>
      </Card>
  );
  }
}

export default withStyles(styles)(EachQuestion);
