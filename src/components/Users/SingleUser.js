import React from "react";

const SingleUser = props => {
  return (
    <>
      <h2>
        {props.user.first_name} {props.user.last_name}
      </h2>
      <h4>
        @{props.user.username}, {props.user.user_type}
      </h4>
      <h4>Bio: {props.user.bio}</h4>
      <h4>Email: {props.user.email}</h4>
      {props.user.user_type === "expert" ? (
        <h4>Hourly Rate: {props.user.hourly_rate}</h4>
      ) : null}
    </>
  );
};

export default SingleUser;
