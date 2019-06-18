import React from "react";

//Material UI
import { TextField, Button, Paper, MenuItem, InputLabel, FormControl, Select, withStyles  
} from '@material-ui/core'

//Import axios
import axios from "axios";

const styles = theme => ({
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
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
    paper: {
      maxWidth: 680,
      [theme.breakpoints.down('md')]: {
        width: '100%'
      },
    },
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

class QuestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      topic: 'Pick one',
      question: '',
      title: ''
    }
}

handleChange = e => 
  this.setState({
    [e.target.name]: e.target.value
  })

sendQuestion = q => {
  console.log('question form function fired!')
  this.props.addQuestion(q)
  this.setState({
    question: '',
    title: ''
  })
}

render() {
    const { classes } = this.props
    const { topic, question, title } = this.state
    const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4', 'topic 5']

    const questionObject = {
      title: title,
      question: question,
      date: Date.now()
    }

    return(
        <Paper className={classes.paper}>
            <form className={classes.form}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Topic</InputLabel>
                <Select
                value={topic}
                // placeholder='Pick one'
                onChange={this.handleChange}
                className={classes.select}
                inputProps={{
                    name: 'topic',
                }}
                >
                {topics.map(topic => 
                    <MenuItem value={topic} key={topic}>{topic}</MenuItem>
                  )}
                </Select>
            </FormControl>
            <TextField
              value={title}
              name='title'
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
              value={question}
              name='question'
              label="My question is..."
              placeholder=""
              multiline
              className={classes.textField}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              />
              {question && topic ? 
              <Button variant="contained" color="primary" className={classes.button} onClick={() => this.sendQuestion(questionObject)}>
                  Submit
              </Button> :
              <Button variant="contained" color="primary" disabled className={classes.button}>
                Submit
              </Button>
            }
              
            </div>
            </form>
        </Paper>
    )
  }
}

export default withStyles(styles)(QuestionForm);
