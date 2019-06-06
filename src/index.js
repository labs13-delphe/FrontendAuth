import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Auth from './Auth'

//define for later user
const auth = new Auth();

//state management 
let state = {

}

//global function to track changes in state of app
window.setState = (changes) => {
    //so we dont mutate actual state
    state = Object.assign({}, state, changes)
    //changes apply on state and are re-rendered 
    ReactDOM.render(<App {...state} />, document.getElementById('root'));
    //pass all properties of state to application
}


/*eslint no-restricted-globals: 0*/
//allows use of restricted globals
// eslint-disable-next-line
//LEAVE THIS
let username = auth.getProfile().given_name || "Stranger";

//set initial state
let initialState = {
    name: username,
    //add routing system - add new property to state
    location: location.pathname.replace(/^\/?|\/$/g, ""),
    //add auth into state will allow to use in any component
    auth
}

//this takes care of calling the render function 
//when the app actually starts
window.setState(initialState)

//ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
