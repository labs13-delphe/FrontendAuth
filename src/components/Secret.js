import React, {Component} from 'react';



export default class Secret extends Component {
    render() {
        return (
            <div>
                You hold the token 
                <br/> 
                THIS WOULD BE THE USER DASHBOARD
               <br/>
               Jump back to <a href='/'>Main Page</a>
               <br/>
               <button onClick={this.props.auth.logout}>LOGOUT</button>
            </div>
        )
    }
}