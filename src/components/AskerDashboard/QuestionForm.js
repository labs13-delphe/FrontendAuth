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
  paper: {
    margin: theme.spacing(1),

    maxWidth: "100%",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: 680,
    padding: 10
  },
  questionTextFields: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between"
  },
  titleInput: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: "35%",
    [theme.breakpoints.down("md")]: {
      width: 300
    }
  },
  questionInput: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: 300
    }
  },

  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
    // add theme.spacing for both elements then match justifyContent to above
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: "30%",
  },
  select: {
    width: "100%"
  },
  button: {
    margin: theme.spacing(1),

  },
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
            <div className={classes.questionTextFields}>
            <TextField
              value={title}
              name="title"
              label="Question Title"
              placeholder="Question Title"
              multiline
              className={classes.titleInput}
              onChange={this.handleChanges}
              margin="normal"
              variant="outlined"
            />
            <TextField
              value={question}
              name="question"
              label="I want to know..."
              placeholder="I want to know..."
              multiline
              className={classes.questionInput}
              onChange={this.handleChanges}
              margin="normal"
              variant="outlined"
            />
            </div>
            
            <div className={classes.bottomRow}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Choose a topic</InputLabel>
                <Select
                  value={topic}
                  onChange={this.handleChanges}
                  className={classes.select}
                  inputProps={{
                    name: "topic"
                  }}
                >
                  {topicsList.map(topic => (
                    <MenuItem value={topic.topic} key={topic.id}>
                      {topic.topic}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Is there  a title, question and topic on state? (Did the user complete the form? If yes, enable the submit button.) */}
              {title && question && topic ? (
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
