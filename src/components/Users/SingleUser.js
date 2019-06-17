import React from "react";


const SingleUser = props => {

  return (
    <>
    <h3>{props.user.first_name} {props.user.last_name}, {props.user.user_type}</h3>
    <h4>username: {props.user.username}</h4>
    <h4>bio: {props.user.bio}</h4>
    <h4>email: {props.user.email}</h4>
    <h4>{props.user.hourly_rate}</h4>
    </>
  );
}

export default SingleUser;