import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import Secret from './components/Secret';
import NotFound from './components/NotFound';
import Callback from './components/Callback';

class App extends Component {
  render()
  {
    let mainComponent = "";
    switch(this.props.location){
      //if nothing display <Main/>
      case "":
      mainComponent = <Main {...this.props}/>
      break;
      case 'callback':
      mainComponent = <Callback />
      break;
      //protected by authorization
      //if user has auth can enter secret page
      case "secret":
      //if auth display secret page if not display not found page
      mainComponent = this.props.auth.isAuthenticated() ? <Secret {...this.props} /> : <NotFound />
      break;
      //if goes to unknown route display NotFound page
      default: 
      mainComponent = <NotFound {...this.props}/>
    }

    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Welcome, {this.props.name}
        </p>
      </header>
    {/* add Main component */}
      {/* <Main /> instead of displaying Main use mainComponent
      so based on location it will define mainComponent and what 
      is displayed on page
      */}
      {mainComponent}
    </div>
    );
  }
}

export default App;
