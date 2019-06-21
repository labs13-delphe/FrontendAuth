import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

// import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  withStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Avatar
} from "@material-ui/core";

const styles = theme => ({
  bigAvatar: {
    margin: 0,
    width: 80,
    height: 80
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  setCardWidth: {
    width: "60%",
    margin: "0 auto",
    padding: 40
  },
  flex: {
    display: "flex",
    justifyContent: "space-between"
  },
  textPad: {
    marginTop: 20,
    marginBottom: 20
  }
});

const SingleUser = props => {
  const { classes } = props;

  //amarachi's google profile img code
  const profileImage = props.user.image_url
  ? props.user.image_url
  : "https://picsum.photos/200/300";
console.log("single user g user", props.user);

  console.log("single user g user", props);
  return (
    <div className="container userContainer ">
      <div className="jumbotron box-shadow">
        <div className={classes.flex}>
          <div className="userHeader">
            <Typography variant="h4" id="delphe-header" className="teal-text text-lighten-2">
              {props.user.first_name} {props.user.last_name}
            </Typography>

            <h4 className="persona-text-name">
              @{props.user.username} | {props.user.user_type}
            </h4>
          </div>
          
          <img
            alt="Remy Sharp"
            src={profileImage}
            className="profile-photo"
          />
         
        </div>
        <div className="persona-text-name bio-text">
          <strong>Bio  </strong>{props.user.bio}
        </div><br/>
        <Typography variant="h12" className="persona-text-name"><strong>Email  </strong>{props.user.email}</Typography>
        {props.user.user_type === "expert" ? (
          <Typography variant="h8">
            <strong>Hourly Rate  </strong>{props.user.hourly_rate}
          </Typography>
        ) : null}
    </div>
    </div>

  );
};

export default withStyles(styles)(SingleUser);
