import React from "react";

import { makeStyles } from "@material-ui/core/styles";
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

  const profileImage = props.user.image_url === null
    ? "https://picsum.photos/200/300"
    : props.user.image_url;
  console.log("single user g user", props.user);
  return (
    <>
      <div className={classes.root} />
      <Paper className={classes.setCardWidth}>
        <div className={classes.flex}>
          <div>
            <Typography variant="h6">
              {props.user.first_name} {props.user.last_name}
            </Typography>

            <h4>
              @{props.user.username}, {props.user.user_type}
            </h4>
          </div>
          <Avatar
            alt="Remy Sharp"
            src={profileImage}
            className={classes.bigAvatar}
          />
        </div>
        <Typography variant="h6" className={classes.textPad}>
          Bio: {props.user.bio}
        </Typography>
        <Typography variant="h6">Email: {props.user.email}</Typography>
        {props.user.user_type === "expert" ? (
          <Typography variant="h6">
            Hourly Rate: {props.user.hourly_rate}
          </Typography>
        ) : null}
      </Paper>
    </>
  );
};

export default withStyles(styles)(SingleUser);
