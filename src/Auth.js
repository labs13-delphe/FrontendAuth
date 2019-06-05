/* eslint no-restricted-globals: 0*/ 
import auth0 from "auth0-js"
import jwtDecode from 'jwt-decode'

const LOGIN_SUCCESS_PAGE = "/secret"

const LOGIN_FAILURE_PAGE = "/"

export default class Auth {
    //provides methods from auth0 used for authentication
    auth0 = new auth0.WebAuth ({
        //auth server on auth0
        domain: "ckidd.auth0.com",
        //clientID from auth0
        clientID: "Bmfiz1XSh0JMuzyWBrovsQs52iIQp7yX",
        //Allowed Callback URLs from auth0
        redirectUri: "http://localhost:3000/callback",
        //endpoint to get some user information
        audience: "https://ckidd.auth0.com/userinfo",
        //token and id_token
        responseType: "token id_token",
        //pass id_token in
        scope: "openid profile"
    })
    //add a few methods to class
    constructor() {
        //make sure bond to right context 
        //this will let us use auth0 inside of method
        this.login = this.login.bind(this);
    }
        //handles redirecting user to login page
        login() {
            this.auth0.authorize();
    }

    handleAuthentication() {
        //parse using auth0 library
        this.auth0.parseHash((error, authResults) => {
        //takes callback with error and authResults
        if (authResults 
        && authResults.accessToken 
        && authResults.idToken)
            //check for auth and tokens 
            { 
    //check for token expiration
        let expiresAt = JSON.stringify((authResults.expiresIn) = 1000 
        + new Date().getTime()) 
        
        //store tokens and token expiration to local storage
        localStorage.setItem('access_token', authResults.accessToken);
        localStorage.setItem('id_token', authResults.idToken);
        localStorage.setItem('expires_at', expiresAt);

        //remove info from query string
        location.hash = "";
        //redirect user to page defined for "success"
        location.pathname = LOGIN_SUCCESS_PAGE;

      }
      //if statement that handles error redirects to failure page
      else if (error) {
        location.pathname = LOGIN_FAILURE_PAGE;
        console.log(error)
      }
     })
    }
    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"))
        //if value is greater than current time stamp
        return new Date().getTime() < expiresAt;
    }

    logout(){
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        location.pathname = LOGIN_FAILURE_PAGE;
    }
    //install npm install --save jwt-decode
    //in index.js gather username from getProfile()
    getProfile () {
        if (localStorage.getItem('id_token')) 
        {
        return jwtDecode(localStorage.getItem('id_token'))
        }
        //if nothing return empty object
        else {
            return {}
        }
    } 
 } 
