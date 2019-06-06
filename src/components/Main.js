import React, {Component} from 'react';



export default class Main extends Component {
    render() {
        return (
            <div>
            <p className="App-intro">
            Hello {this.props.name} <br />
            Do you want to enter a secret area? <br />
            <a href="/notfound">CLICK HERE</a>
            </p>
            {!this.props.auth.isAuthenticated() && 
            <div>
                <hr/>
                Please login first
                <hr/>
                <button onClick={this.props.auth.login}>LOGIN</button>
            </div>
            }
            </div>
        )
    }
}