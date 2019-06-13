import React from "react";
// import axios from "axios";


// axios.defaults.baseURL =
//   process.env.API_URL || "https://delphe-backend.herokuapp.com/api";

const SingleUser = props => {

  return (
    <>
    <h4>name: {props.user.first_name} {props.user.last_name}</h4>
    <h4>bio: {props.user.bio}</h4>
    <h4>email: {props.user.email}</h4>
    <h4>{props.user.hourly_rate}</h4>
    </>
  );
}

export default SingleUser;