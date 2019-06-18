// Packages
import React from "react";
import axios from "axios";

// Material UI
import {
  TextField,
  Button,
  Paper,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  withStyles
} from "@material-ui/core";

// Custom Styles
const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    [theme.breakpoints.down("md")]: {
      width: 300
    }
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  paper: {
    maxWidth: 680,
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  select: {
    width: 200
  }
});

class QuestionForm extends React.Component {
  state = {
    user_id: localStorage.getItem("user_id"),
    title: "",
    question: "",
    topic: "",
    topicsList: []
  };

  componentDidMount() {
    // Get Topics List for Topics Dropdown Menu
    const endpoint = "https://delphe-backend.herokuapp.com/api/topics";
    axios
      .get(endpoint)
      .then(res => {
        console.log("Topics List:", res.data);
        this.setState({ topicsList: res.data });
      })
      .catch(err => {
        console.log("there was a problem getting list of topics");
      });
  }

  // handleChange = e => 
  // this.setState({
  //   [e.target.name]: e.target.value
  // })

  handleChanges = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitForm = e => {
    e.preventDefault();
    const questionURL = "https://delphe-backend.herokuapp.com/api/questions";
    const topicURL = "https://delphe-backend.herokuapp.com/api/topics";
    const qtURL = "https://delphe-backend.herokuapp.com/api/topics/question";

    const questionBody = {
      user_id: this.state.user_id,
      title: this.state.title,
      question: this.state.question
    };
    axios
      .post(questionURL, questionBody) // posting question to questions table
      .then(res => {
        console.log("Question Res:", res.data);
        const q_id = res.data.id;
        axios
          .post(topicURL, this.state) // finding topic in topics table
          .then(res => {
            console.log("Topic Res:", res.data);
            const t_id = res.data.id;
            const questionTopicIds = {
              question_id: q_id,
              topic_id: t_id
            };
            axios
              .post(qtURL, questionTopicIds) // posting question_id and topic_id to question_topics table
              .then(res => {
                console.log("QT Res:", res.data);
                console.log(q_id, t_id, res.data.id);
                alert("Your question has been submitted!");
                window.location.reload();
                this.setState({
                  title: "",
                  question: "",
                  topic: ""
                });
              })
              .catch(err => {
                console.log("Post QuestionTopic Error", err);
              });
          })
          .catch(err => {
            console.log("Post Topic Error", err);
          });
      })
      .catch(err => {
        console.log("Post Question Error", err);
      });
  };

  render() {
    const { classes } = this.props;
    const { title, question, topic, topicsList } = this.state;
    return (
      <div>

<Paper className={classes.paper}>
            <form className={classes.form}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Choose a topic</InputLabel>
                <Select
                value={topic}
                onChange={this.handleChanges}
                className={classes.select}
                inputProps={{
                    name: 'topic',
                }}
                >
                {topicsList.map(topic => 
                    <MenuItem value={topic.topic} key={topic.id}>{topic.topic}</MenuItem>
                  )}
                </Select>
            </FormControl>
            <TextField
              value={title}
              name='title'
              label="Question Title"
              placeholder="Question Title"
              multiline
              className={classes.textField}
              onChange={this.handleChanges}
              margin="normal"
              variant="outlined"
              />
            <div className={classes.bottomRow}>
              <TextField
              value={question}
              name='question'
              label="I want to know..."
              placeholder="I want to know..."
              multiline
              className={classes.textField}
              onChange={this.handleChanges}
              margin="normal"
              variant="outlined"
              />
              {question && topic ? 
              <Button variant="contained" color="primary" className={classes.button} onClick={this.submitForm}>
                  Submit
              </Button> :
              <Button variant="contained" color="primary" disabled className={classes.button}>
                Submit
              </Button>
            }
              
            </div>
            </form>
        </Paper>

        {/* <h3>Ask A Question</h3>
        <form onSubmit={this.submitForm}>
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChanges}
            placeholder="Title"
          />
          <input
            name="question"
            type="text"
            value={this.state.question}
            onChange={this.handleChanges}
            placeholder="What's your question?"
          />
          <input
            name="topic"
            type="text"
            value={this.state.topic}
            onChange={this.handleChanges}
            placeholder="Topic"
          />

          <input type="submit" value="submit" />
        </form> */}
      </div>
    );
  }
}

export default withStyles(styles)(QuestionForm);
