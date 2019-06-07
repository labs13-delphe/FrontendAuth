import React, { Component } from "react";

export default class NotFound extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        Token troll says: You must login for your token.
        <hr />
        <div>
          Please login first
          <hr />
          <button onClick={this.props.auth.login}>LOGIN</button>
        </div>
      </div>
    );
  }
}
