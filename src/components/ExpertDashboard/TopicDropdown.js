// Packages
import React from "react";
import axios from "axios";

// Material UI
import {
  TextField,
  Typography,
  Button,
  Paper,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Select,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  paper: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    //background: "orange",
    width: 680, // maybe use viewport measure?
    padding: 10
  },
  formTitle: {
    marginLeft: theme.spacing(1)
  },
  questionTextFields: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  titleInput: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: "35%",
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  questionInput: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: "60%",
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },

  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: "35%",
    [theme.breakpoints.down("xs")]: {
      width: "60%"
    }
  },
  select: {
    width: "100%"
  },
  button: {
    margin: theme.spacing(1)
  }
});

class TopicDropdown extends React.Component {
  state = {
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
    console.log("fired get quiestions function!");

    var result = this.state.topicsList.find(obj => {
      return obj.topic === e.target.value;
    });

    const { name, value } = e.target;
    this.setState({
      [name]: value
      // selected_topic_id: result.id
    });

    this.props.getQuestionsByTopic(result.id);
  };

  render() {
    const { topic, topicsList } = this.state,
      { classes } = this.props;
    console.log(topicsList);
    return (
      <form className={classes.form}>
        <FormControl /*variant="outlined"*/ className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-simple">Choose a topic</InputLabel>
          <Select
            value={topic}
            onChange={this.handleChanges}
            className={classes.select}
            inputProps={{
              name: "topic"
            }}
            input={<OutlinedInput name="topic" id="outlined-age-simple" />}
          >
            {topicsList.map(topic => (
              <MenuItem value={topic.topic} key={topic.id}>
                {topic.topic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(TopicDropdown);
